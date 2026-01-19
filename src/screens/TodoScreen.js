import React, {useState} from 'react';
import { Platform, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Keyboard} from 'react-native';
import Task from '../components/Task';
import { COLORS } from '../../assets/colors';

export default function TodoScreen() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  
  const handleAddTask = () => {
     Keyboard.dismiss();
     if (editingIndex !== null) {
       // Update existing task
       let itemsCopy = [...taskItems];
       itemsCopy[editingIndex] = task;
       setTaskItems(itemsCopy);
       setEditingIndex(null);
     } else {
       // Add new task
       setTaskItems([...taskItems, task]);
     }
     setTask(null);
  }

  const updateTask = (index) => {
    // Set task for editing
    setTask(taskItems[index]);
    setEditingIndex(index);
  }

  const removeTask = (index) => {
    // Logic for removing a task
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      {/* Paidy-Secure-Todo App */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>To-Do List</Text>
        <View style={styles.items}>
          {/* This is where the tasks will go */}
          {taskItems.map((item, index) => {
            return (
              <Task 
                key={index} 
                text={item} 
                onUpdate={() => updateTask(index)}
                onRemove={() => removeTask(index)}
              />
            )
          })}
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding": "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Enter here'} value={task} onChangeText={text => setTask(text)}/>
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>{editingIndex !== null ? 'Update' : 'Add'}</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,

  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper:{
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
    borderRadius: 60,
    width: '70%',
    height: 50,
    fontSize: 18,
    borderWidth: 1,
    borderColor: COLORS.backgroundLight,
  },
  addWrapper:{
    width: 80,
    height: 60,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.backgroundLight,
  },
  addText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textWhite,
  }
});