import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { saveTask } from './TaskStorage'; 

export default function AddTask({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [etat, setEtat] = useState('Nouveau');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleAddTask = async () => {
    if (title && description) {
      const newTask = {
        title,
        description,
        etat,
        date: date.toLocaleDateString(),
        heure: time.toLocaleTimeString(),
      };
  
      await saveTask(newTask); // ajout 
  
     
      navigation.navigate('ListTask', { refreshTasks: true , status:'all' });
        } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ajouter une Tâche</Text>

      <TextInput
        style={styles.input}
        placeholder="Titre de la tâche"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <RNPickerSelect
        onValueChange={(value) => setEtat(value)}
        items={[
          { label: 'Nouveau', value: 'Nouveau' },
          { label: 'Approuvé', value: 'Approuvé' },
          { label: 'En cours', value: 'En cours' },
          { label: 'Prête', value: 'Prête' },
          { label: 'En test', value: 'En test' },
          { label: 'Terminé', value: 'Terminé' },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: 'Sélectionnez le statut', value: null }}
        value={etat}
      />

      <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateTimeText}>{`Date: ${date.toLocaleDateString()}`}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.dateTimeText}>{`Heure: ${time.toLocaleTimeString()}`}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setTime(selectedTime);
          }}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Ajouter Tâche</Text>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    paddingTop: 80,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top', // Makes the text input start at the top for multiline
  },
  dateTimeButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dateTimeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ecf0f1',
    borderRadius: 10,
    color: '#2c3e50',
    paddingRight: 30, // to ensure the text is not behind the icon
    backgroundColor: '#ecf0f1',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ecf0f1',
    borderRadius: 10,
    color: '#2c3e50',
    paddingRight: 30,
    backgroundColor: '#ecf0f1',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
};
