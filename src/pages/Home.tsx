import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task } from '../components/TaskItem';
import { TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExists = !!tasks.find(task => task.title === newTaskTitle);

    if (taskAlreadyExists) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
    } else {
      const id = new Date().getTime();
      const done = false;
      setTasks([...tasks, {id, title: newTaskTitle, done}]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const task = tasks.find(task => task.id === id);
    task && (task.done = !task?.done);
    const updatedTasks = tasks.map(task => ({ ...task }));

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?',
     [
       {
         text: 'Não'
       },
       {
         text: 'Sim',
         onPress: () => setTasks(tasks.filter(t => t.id !== id))
       }
     ])
  }

  function handleEditTask(taskUpdate: { taskId: number, taskNewTitle: string }) {
    const task = tasks.find(task => task.id === taskUpdate.taskId);
    task && (task.title = taskUpdate.taskNewTitle);
    const updatedTasks = tasks.map(task => ({ ...task }));

    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})