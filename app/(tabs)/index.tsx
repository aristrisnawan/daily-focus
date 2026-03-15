import { greyColor, primaryColor, secondaryColor } from '@/constants/theme';
import { Checkbox } from 'expo-checkbox';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Finish React Native project', done: false },
    { id: '2', title: 'Write README', done: true },
    { id: '3', title: 'Publish to Expo', done: false },
  ]);

  const toggleTask = (taskId: string, done: boolean) => {
    setTasks(prev => prev.map(t => (t.id === taskId ? { ...t, done } : t)));
  };

  const completedCount = tasks.filter(t => t.done).length;
  const progressPercent = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <SafeAreaProvider>
      <View style={styles.profile}>
        <Text style={[styles.profileText, { fontWeight: 'bold' }]}>Hello Aris 👋</Text>
        <Text style={[styles.profileText, { fontWeight: 'normal' }]}>Let's be productive today!</Text>
      </View>
      <View style={styles.progressContainer} >
        <Text style={styles.fontProgress}>Today's Progress</Text>
        <Text style={styles.fontProgress}>{`${progressPercent}%`}</Text>
        <View style={styles.progressBar} >
          <View
            style={[
              styles.progressFill,
              { width: `${progressPercent}%` },
            ]}
          >
            <Text style={styles.progressText}>{`${progressPercent}%`}</Text>
          </View>
        </View>
        <Text>{`${completedCount} / ${tasks.length} tasks completed`}</Text>
      </View>
      <View style={{padding: 16}}>
        <Text style={[styles.fontProgress, { fontWeight: 'bold', marginBottom: 8 }]}>Today's Tasks</Text>
        {tasks.map(task => (
          <View
            key={task.id}
            style={{
              backgroundColor: greyColor,
              borderRadius: 10,
              padding: 12,
              marginVertical: 4,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Checkbox value={task.done} onValueChange={value => toggleTask(task.id, value)} />
            <Text
              style={{
                marginLeft: 8,
                textDecorationLine: task.done ? 'line-through' : 'none',
                color: task.done ? 'gray' : 'black',
              }}
            >
              {task.title}
            </Text>
          </View>
        ))}
        <TouchableOpacity style={{
          backgroundColor: secondaryColor,
          padding: 12,
          borderRadius: 10,
          marginTop: 16,
          alignItems: 'center',
        }}>
          <Text>Add Task</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: 30,
    marginHorizontal: 16,
  },
  progressContainer: {
    backgroundColor: greyColor,
    padding: 16,
    marginTop: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  profileText: {
    fontSize: 24
  },
  fontProgress: {
    fontSize: 18,
  },
  progressBar: {
    backgroundColor: '#7AB2B2',
    height: 20,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 8,
  },
  progressFill: {
    backgroundColor: primaryColor,
    height: 20,
    borderRadius: 10,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  progressText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    paddingRight: 10
  }
});
