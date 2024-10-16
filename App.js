import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Accueil from './pages/Accueil';
import AddTask from './pages/AddTask';
import TaskList from './pages/TaskList';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="accueil" component={Accueil} />
        <Stack.Screen name="AddTask" component={AddTask} />
        <Stack.Screen name="ListTask" component={TaskList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
