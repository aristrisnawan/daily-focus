import { fetchTasks, updateTaskStatus } from '@/api/task';
import { greyColor, primaryColor } from '@/constants/theme';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Checkbox } from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type Task = { id: string; title: string; done: boolean; date?: string; type: 'task' };
type Habit = { id: string; title: string; done: boolean; type: 'habit' };
type Section = { type: 'section'; title: string };
type AddButton = { type: 'addButton' };
type Item = Task | Habit | Section | AddButton;

export default function HomeScreen() {
  const queryClient = useQueryClient();

  const {data: tasksData = [], isLoading, isError, error} = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks
  })

  const updateMutation = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })

  const [habits, setHabits] = useState([
    { id: '1', title: 'Morning Exercise', done: true },
    { id: '2', title: 'Read a Book', done: false },
    { id: '3', title: 'Meditation', done: true },
  ]);

  const toggleHabit = (habitId: string, done: boolean) => {
    setHabits(prev => prev.map(h => (h.id === habitId ? { ...h, done } : h)));
  };

  const handleToggleTask = (task: Task) => {
    const updateTask = {...task, done: !task.done}
    updateMutation.mutate(updateTask)
  }

  const completedCount = tasksData.filter(t => t.done).length;
  const progressPercent = tasksData.length ? Math.round((completedCount / tasksData.length) * 100) : 0;

  const Header = () => {
    return (
      <View>
        <View style={styles.profile}>
          <Text style={[styles.profileText, { fontWeight: 'bold' }]}>Hello Aris 👋</Text>
          <Text style={[styles.profileText, { fontWeight: 'normal' }]}>Let's be productive today!</Text>
        </View>
        <View style={[styles.progressContainer, { marginBottom: 10 }]}>
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
          <Text>{`${completedCount} / ${tasksData.length} tasks completed`}</Text>
        </View>
      </View>
    )
  }

  const toTitleCase = (text: string) => {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

  const combinatedData: Item[] = [
    { type: "section", title: "Today's Tasks" },

    ...tasksData.map((task) => ({
      ...task,
      type: "task",
    })),

    { type: "addButton" } as any,

    { type: "section", title: "Today's Habits" },

    ...habits.map((habit) => ({
      ...habit,
      type: "habit",
    }) as Habit),
  ];


  return (
    <SafeAreaProvider>
      <FlatList
        data={combinatedData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 16 }}
        ListHeaderComponent={<Header />}
        renderItem={({ item }: { item: Item }) => {

          if (item.type === 'section') {
            return (
              <Text style={[styles.fontProgress, { fontWeight: 'bold', marginVertical: 10, paddingHorizontal: 16 }]}>
                {item.title}
              </Text>
            );
          }

          if (item.type === 'task') {
            return (
              <View style={[styles.checkboxStyle, { marginHorizontal: 16 }]}>
                <Checkbox
                  value={item.done}
                  onValueChange={() => handleToggleTask(item)}
                />
                <Text
                  style={{
                    marginLeft: 8,
                    textDecorationLine: item.done ? 'line-through' : 'none',
                    color: item.done ? 'gray' : 'black',
                  }}
                >
                  {toTitleCase(item.title)}
                </Text>
              </View>
            );
          }

          if (item.type === 'habit') {
            return (
              <View style={[styles.checkboxStyle, { marginHorizontal: 16 }]}>
                <Checkbox
                  value={item.done}
                  onValueChange={(value) => toggleHabit(item.id, value)}
                />
                <Text
                  style={{
                    marginLeft: 8,
                    textDecorationLine: item.done ? 'line-through' : 'none',
                    color: item.done ? 'gray' : 'black',
                  }}
                >
                  {item.title}
                </Text>
              </View>
            );
          }

          if (item.type === 'addButton') {
            return (
              <TouchableOpacity
                onPress={() => router.push('/add-task')}
                style={{ marginHorizontal: 16 }}
              >
                <LinearGradient
                  colors={['#FF8C00', '#FFD150']}
                  style={styles.btnAdd}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    Add Task
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          }

          return null;
        }}
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
