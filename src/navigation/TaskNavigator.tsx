import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TaskStackParamList } from '../types/navigation';
import { TaskListScreen } from '../screens/tasks/TaskListScreen';
import { TaskDetailScreen } from '../screens/tasks/TaskDetailScreen';
import { TaskFormScreen } from '../screens/tasks/TaskFormScreen';

const Stack = createNativeStackNavigator<TaskStackParamList>();

export const TaskNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="TaskList"
                component={TaskListScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="TaskDetail"
                component={TaskDetailScreen}
                options={{
                    title: 'Görev Detayı',
                }}
            />
            <Stack.Screen
                name="TaskForm"
                component={TaskFormScreen}
                options={({ route }) => ({
                    title: route.params?.task ? 'Görevi Düzenle' : 'Yeni Görev',
                })}
            />
        </Stack.Navigator>
    );
}; 