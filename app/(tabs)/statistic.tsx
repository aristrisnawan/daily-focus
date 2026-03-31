import { fetchHabitsLog } from "@/api/habbit";
import { fetchTasks } from "@/api/task";
import { greyColor, primaryColor, secondaryColor } from "@/constants/theme";
import { getBestStreak } from "@/function/getBestStreak";
import { getCurrentStreak } from "@/function/getCurrentStreak";
import { getWeeklyProgress } from "@/function/getWeeklyProgress";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";

const Statistic = () => {
    const { data: tasksData = [] } = useQuery({
        queryKey: ['tasks'],
        queryFn: fetchTasks
    })
    const {data: habitsData = []} = useQuery({
        queryKey: ['habitslog'],
        queryFn: fetchHabitsLog
    })
    const barData = getWeeklyProgress(tasksData);
    const totalTasksComplated = tasksData.filter(t => t.done).length;
    const totalHabitsCompleted = habitsData.filter(h => h.completed).length;
    const currentStreak = getCurrentStreak(tasksData)
    const bestStreak = getBestStreak(tasksData)

    return (
        <SafeAreaView>
            <View style={[styles.container, { marginTop: 16 }]}>
                <View style={[styles.circleIcon, { backgroundColor: secondaryColor }]}>
                    <MaterialIcons name="check" size={30} color="white" />
                </View>
                <View>
                    <Text>Completed Tasks</Text>
                    <Text>☆☆☆☆☆</Text>
                </View>
                <Text style={styles.countCompleted}>
                    {totalTasksComplated}
                </Text>
            </View>
            <View style={[styles.container, { marginTop: 10 }]}>
                <View style={[styles.circleIcon, { backgroundColor: primaryColor }]}>
                    <MaterialIcons name="check" size={30} color="white" />
                </View>
                <View>
                    <Text>Completed Habits</Text>
                    <Text>☆☆☆☆☆</Text>
                </View>
                <Text style={styles.countCompleted}>
                    {totalHabitsCompleted}
                </Text>
            </View>
            <View style={[styles.container, { marginTop: 10 }]}>
                <MaterialIcons name="emoji-events" size={30} color='grey' />
                <View>
                    <Text>Current Streak</Text>
                    <Text>Best Streak</Text>
                </View>
                <View style={styles.countCurrentStreak}>
                    <Text style={styles.countCurrentStreakText}>{currentStreak} days</Text>
                    <Text style={styles.countCurrentStreakText}>{bestStreak} days</Text>
                </View>
            </View>
            <View style={{ marginHorizontal: 16, marginTop: 10 }}>
                <Text style={{ marginVertical: 10 }}>Weekly Progress</Text>
                <BarChart
                    barWidth={22}
                    noOfSections={3}
                    barBorderRadius={4}
                    frontColor={primaryColor}
                    data={barData}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    dashGap={1}
                />
            </View>
        </SafeAreaView>
    )
}
export default Statistic;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        backgroundColor: greyColor,
        borderRadius: 10,
        flexDirection: 'row',
        padding: 16,
        gap: 10
    },
    circleIcon: {
        height: 40,
        width: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    countCompleted: {
        fontSize: 24,
        fontWeight: 'semibold',
        marginLeft: 'auto'
    },
    countCurrentStreak: {
        marginLeft: 'auto',
        alignItems: 'flex-end'
    },
    countCurrentStreakText: {
        fontSize: 12
    }
})

