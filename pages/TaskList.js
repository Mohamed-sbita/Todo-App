import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { getTasks, removeTask } from "./TaskStorage";
import Icon from "react-native-vector-icons/Ionicons";

export default function TaskList({ navigation, route }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const storedTasks = await getTasks();
    const filteredTasks = route.params?.status === 'all' 
      ? storedTasks 
      : storedTasks.filter(task => task.etat === route.params?.status);
    setTasks(filteredTasks);
  };

  useEffect(() => {
    fetchTasks();

    const unsubscribe = navigation.addListener("focus", fetchTasks);
    return unsubscribe; 
  }, [navigation]);

  const handleDeleteTask = async (index) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          const updatedTasks = await removeTask(index);
          setTasks(updatedTasks);
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.navigate("accueil")}
      >
        <Text style={styles.backArrowText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.header}>
        {route.params?.status === 'all' ? 'All Tasks' : `Tasks: ${route.params?.status}`}
      </Text>

      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <View key={index} style={styles.taskItem}>
            <View style={styles.taskInfo}>
              <Text style={styles.title}>{task.title}</Text>
              <Text>{task.description}</Text>
              <Text>{`State: ${task.etat}`}</Text>
              <Text>{`Due Date: ${task.date}, Time: ${task.heure}`}</Text>
            </View>
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => handleEditTask(index)}>
                <Icon
                  name="pencil-outline"
                  size={25}
                  color="blue"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                <Icon
                  name="trash-outline"
                  size={25}
                  color="red"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text>aucune tâche disponible. </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 80,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
  },
  taskItem: {
    flexDirection: "row", // Arrange task info and icons in a row
    alignItems: "center",
    justifyContent: "space-between", // Push icons to the right
    marginBottom: 20,
    padding: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    backgroundColor: "#ffffff", // White background for task items
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  taskInfo: {
    flex: 1, // Task info takes up the available space on the left
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  iconsContainer: {
    flexDirection: "row", // Icons in a row (edit, delete)
    alignItems: "center", // Vertically align icons
  },
  icon: {
    marginHorizontal: 10,
  },
  backArrow: {
    position: "absolute",
    top: 80, // Adjust based on your design needs
    left: 20, // Adjust based on your design needs
    backgroundColor: "#3498db", // A chic blue background
    borderRadius: 25, // Rounded circular style
    width: 50, // Circular button width
    height: 50, // Circular button height
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000", // Shadow for depth effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Elevation for Android shadow
  },
  backArrowText: {
    fontSize: 40, // Large arrow size
    color: "#fff", // White color for contrast
    fontWeight: "bold",
  },
});
