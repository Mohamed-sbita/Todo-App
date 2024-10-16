import AsyncStorage from '@react-native-async-storage/async-storage';

const TASK_STORAGE_KEY = 'tasks';

const defaultTasks = [];
// get all 
export const getTasks = async () => {
  try {
    const tasksJson = await AsyncStorage.getItem(TASK_STORAGE_KEY);
    return JSON.parse(tasksJson);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return defaultTasks; 
  }
};
// ajout tache : 
export const saveTask = async (newTask) => {
  try {
    const existingTasks = await getTasks();
    const updatedTasks = [newTask, ...existingTasks];
    await AsyncStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(updatedTasks));
    return updatedTasks;
  } catch (error) {
    console.error('Error saving task:', error);
  }
};
// delete tache : 
export const removeTask = async (taskIndex) => {
  try {
    const tasks = await getTasks();
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex); 
    await AsyncStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(updatedTasks));
    return updatedTasks;
  } catch (error) {
    console.error('Error removing task:', error);
  }
};


