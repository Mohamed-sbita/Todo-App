import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getTasks } from './TaskStorage'; // Assuming you fetch tasks from AsyncStorage

export default function Accueil({ navigation }) {
  const [taskCounts, setTaskCounts] = useState({
    nouveau: 0,
    approuvé: 0,
    enCours: 0,
    prête: 0,
    enTest: 0,
    terminé: 0,
  });

  const refreshTaskCounts = async () => {
    const tasks = await getTasks();
    const counts = {
      nouveau: tasks.filter(task => task.etat === 'Nouveau').length,
      approuvé: tasks.filter(task => task.etat === 'Approuvé').length,
      enCours: tasks.filter(task => task.etat === 'En cours').length,
      prête: tasks.filter(task => task.etat === 'Prête').length,
      enTest: tasks.filter(task => task.etat === 'En test').length,
      terminé: tasks.filter(task => task.etat === 'Terminé').length,
    };
    setTaskCounts(counts);
  };

  useFocusEffect(
    useCallback(() => {
      // This will run when the Accueil screen comes into focus
      refreshTaskCounts();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>ToDo App</Text>

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListTask', { status: 'all' })}>
          <Text style={styles.buttonText}>Toutes mes tâches</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListTask', { status: 'Nouveau' })}>
          <Text style={styles.buttonText}>Nouveau ({taskCounts.nouveau})</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListTask', { status: 'Approuvé' })}>
          <Text style={styles.buttonText}>Approuvé ({taskCounts.approuvé})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListTask', { status: 'En cours' })}>
          <Text style={styles.buttonText}>En cours ({taskCounts.enCours})</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListTask', { status: 'Prête' })}>
          <Text style={styles.buttonText}>Prête ({taskCounts.prête})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListTask', { status: 'En test' })}>
          <Text style={styles.buttonText}>En test ({taskCounts.enTest})</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListTask', { status: 'Terminé' })}>
          <Text style={styles.buttonText}>Terminé ({taskCounts.terminé})</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 30,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#27ae60',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
