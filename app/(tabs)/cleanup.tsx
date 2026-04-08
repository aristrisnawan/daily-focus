import { cleanupTasks } from "@/api/task";
import { primaryColor } from "@/constants/theme";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CleanupScreen() {
    const queryClient = useQueryClient();

    const cleanupMutation = useMutation({
        mutationFn: cleanupTasks,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            Alert.alert("Success", "Completed tasks have been archived.");
        },
        onError: () => {
            Alert.alert("Error", "Failed to cleanup tasks.");
        }
    });

    const handleCleanup = () => {
        Alert.alert(
            "Cleanup Tasks",
            "Are you sure you want to clean up completed tasks? They will be removed from your active task list but will still be counted in statistics.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Cleanup", style: "destructive", onPress: () => cleanupMutation.mutate() }
            ]
        );
    }

    return (
        <SafeAreaView>
            <View style={{ marginHorizontal: 16, marginTop: 16 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 10 }}>Cleanup Data</Text>
                <Text style={{ marginBottom: 20, color: 'gray' }}>Clean up tasks that you have already completed. They will be archived and won't show up in your active view, but they will still be counted in your statistics.</Text>
                
                <TouchableOpacity 
                    style={[styles.button, cleanupMutation.isPending && styles.buttonDisabled]} 
                    onPress={handleCleanup} 
                    disabled={cleanupMutation.isPending}
                >
                    <Text style={styles.buttonText}>{cleanupMutation.isPending ? "Cleaning up..." : "Cleanup Now"}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FF4C4C',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonDisabled: {
        opacity: 0.6
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
});