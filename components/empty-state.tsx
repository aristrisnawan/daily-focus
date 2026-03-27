import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EmptyState() {
  return (
    <View style={styles.emptyContainer}>
      <Image
        source={require('../assets/images/empty.png')}
        style={styles.emptyImage}
      />
      <Text style={styles.emptyTitle}>No Tasks Yet!</Text>
      <Text style={styles.emptySubtitle}>
        Start your productive day by adding your first task.
      </Text>
      <TouchableOpacity
        onPress={() => router.push('/add-task')}
        style={styles.emptyButton}
      >
        <LinearGradient
          colors={['#FF8C00', '#FFD150']}
          style={styles.btnAdd}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Add Your First Task
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
    emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 100,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 24,
    opacity: 0.7,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  emptyButton: {
    width: '100%',
    alignItems: 'center',
  },
    btnAdd: {
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
    alignItems: 'center',
  }
})