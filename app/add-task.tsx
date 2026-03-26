import { addTask } from "@/api/task";
import { primaryColor } from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import {
    Keyboard,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

function formatDate(date?: Date) {
    if (!date) return "_/_/_.";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

const AddTask = () => {
    const queryClient = useQueryClient()
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [deadline, setDeadline] = useState<Date | undefined>(undefined);
    const [showPicker, setShowPicker] = useState(false);

    const addTaskMutation = useMutation({
        mutationFn: addTask,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['tasks']})
            router.back();
        }
    })

    const handleAddTask = () => {
        if (!title.trim()) {
            alert('Task title cannot be empty');
            return;
        }
        
        addTaskMutation.mutate({
            title: title.trim(),
            description: description.trim() || undefined,
            date: deadline?.toISOString(),
        });
    }

    const minDate = new Date();
    minDate.setHours(0, 0, 0, 0);

    const onChange = (_: any, selectedDate?: Date) => {
        setShowPicker(Platform.OS === "ios");
        if (selectedDate && selectedDate >= minDate) {
            setDeadline(selectedDate);
        }
    };

    return (
        <SafeAreaProvider>
            <View style={{ backgroundColor: 'white', borderRadius: 10, margin: 16, padding: 10 }}>
                <Text>Title</Text>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 8, marginTop: 8 }}
                        placeholder="Enter task title" />
                </TouchableWithoutFeedback>
                <Text style={{ marginTop: 16 }}>Description</Text>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 8, marginTop: 8, height: 100 }}
                        multiline={true}
                        numberOfLines={10}
                        textAlignVertical="top"
                    />
                </TouchableWithoutFeedback>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, alignItems: 'center' }}>
                    <Text>Deadline</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 4 }}>
                        <Text style={{ marginRight: 8 }}>{formatDate(deadline)}</Text>
                        <TouchableOpacity onPress={() => setShowPicker(true)}>
                            <MaterialIcons name="calendar-today" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                {showPicker && (
                    <DateTimePicker
                        value={deadline ?? minDate}
                        mode="date"
                        display="default"
                        minimumDate={minDate}
                        onChange={onChange}
                    />
                )}
            </View>

            <View style={{ backgroundColor: 'white', height: 100, position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                <View style={{ flexDirection: 'row', padding: 16, gap: 8 }}>
                    <TouchableOpacity onPress={() => router.back()} style={{ flex: 1, backgroundColor: 'gray', padding: 10, borderRadius: 5 }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={handleAddTask}
                        disabled={!title || addTaskMutation.isPending}
                        style={{ flex: 1, backgroundColor: primaryColor, padding: 10, borderRadius: 5, opacity: !title || addTaskMutation.isPending ? 0.6 : 1 }}
                    >
                        <Text style={{ color: 'white', textAlign: 'center' }}>{addTaskMutation.isPending ? 'Adding...' : 'Add'}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaProvider>
    )
}

export default AddTask;