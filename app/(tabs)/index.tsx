import { greyColor, primaryColor } from '@/constants/theme';
import { Checkbox } from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Finish React Native project', done: false },
    { id: '2', title: 'Write README', done: true },
    { id: '3', title: 'Publish to Expo', done: false },
    { id: '4', title: 'Share on Twitter', done: false },
    { id: '5', title: 'Celebrate 🎉', done: false },
    { id: '6', title: 'Go for a walk', done: true },
  ]);

  const [habits, setHabits] = useState([
    { id: '1', title: 'Morning Exercise', done: true },
    { id: '2', title: 'Read a Book', done: false },
    { id: '3', title: 'Meditation', done: true },
  ]);

  const toggleHabit = (habitId: string, done: boolean) => {
    setHabits(prev => prev.map(h => (h.id === habitId ? { ...h, done } : h)));
  };

  const toggleTask = (taskId: string, done: boolean) => {
    setTasks(prev => prev.map(t => (t.id === taskId ? { ...t, done } : t)));
  };

  const completedCount = tasks.filter(t => t.done).length;
  const progressPercent = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  const Header = () => {
    return (
      <View>
        <View style={styles.profile}>
          <Text style={[styles.profileText, { fontWeight: 'bold' }]}>Hello Aris 👋</Text>
          <Text style={[styles.profileText, { fontWeight: 'normal' }]}>Let's be productive today!</Text>
        </View>
        <View style={[styles.progressContainer, {marginBottom: 10}]}>
          <Text style={styles.fontProgress}>Today's Progress</Text>
          <Text style={styles.fontProgress}>{`${progressPercent}%`}</Text>
          <View style={styles.progressBar}>
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
        <Text style={[styles.fontProgress, { fontWeight: 'bold', marginVertical: 10, paddingHorizontal: 16 }]}>Today's Tasks</Text>
      </View>
    )
  }

  const Footer = () => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => alert('halo')}
          style={{ marginHorizontal: 16 }}
        >
          <LinearGradient
            colors={['#FF8C00', '#FFD150']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.btnAdd}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Add Task</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={{ padding: 16 }}>
          <Text style={[styles.fontProgress, { fontWeight: 'bold', marginBottom: 10 }]}>Today's Habits</Text>
          {habits.map(habit => (
            <View
              key={habit.id}
              style={styles.checkboxStyle}
            >
              <Checkbox value={habit.done} onValueChange={value => toggleHabit(habit.id, value)} />
              <Text
                style={{
                  marginLeft: 8,
                  textDecorationLine: habit.done ? 'line-through' : 'none',
                  color: habit.done ? 'gray' : 'black',
                }}
              >
                {habit.title}
              </Text>
            </View>
          ))}
        </View>
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <FlatList
        keyExtractor={(task) => task.id}
        data={tasks}
        ListHeaderComponent={<Header />}
        renderItem={({ item: task }) => {
          return (
            <View
              key={task.id}
              style={[styles.checkboxStyle, { marginHorizontal: 16 }]}
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
          )
        }}
        ListFooterComponent={<Footer />}
      />
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
  },
  btnAdd: {
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
    alignItems: 'center',
  },
  checkboxStyle: {
    backgroundColor: greyColor,
    borderRadius: 10,
    padding: 12,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  }
});
