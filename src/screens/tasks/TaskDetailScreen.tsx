import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { TaskStackParamList } from '../../types/navigation';
import { RootState, AppDispatch } from '../../store';
import { fetchTask, deleteTask, updateTask } from '../../store/slices/taskSlice';

type TaskDetailScreenRouteProp = RouteProp<TaskStackParamList, 'TaskDetail'>;
type TaskDetailScreenNavigationProp = NativeStackNavigationProp<TaskStackParamList, 'TaskDetail'>;

export const TaskDetailScreen = () => {
    const navigation = useNavigation<TaskDetailScreenNavigationProp>();
    const route = useRoute<TaskDetailScreenRouteProp>();
    const dispatch = useDispatch<AppDispatch>();
    const { taskId } = route.params;
    const task = useSelector((state: RootState) => state.tasks.selectedTask);

    useEffect(() => {
        dispatch(fetchTask(taskId));
    }, [dispatch, taskId]);

    const handleDelete = () => {
        Alert.alert(
            'Görevi Sil',
            'Bu görevi silmek istediğinizden emin misiniz?',
            [
                { text: 'İptal', style: 'cancel' },
                {
                    text: 'Sil',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await dispatch(deleteTask(taskId)).unwrap();
                            navigation.goBack();
                        } catch (err) {
                            Alert.alert('Hata', 'Görev silinirken bir hata oluştu');
                        }
                    },
                },
            ]
        );
    };

    const handleToggleComplete = async () => {
        try {
            if (!task) return;

            await dispatch(
                updateTask({
                    taskId,
                    updates: { completed: !task.completed },
                })
            ).unwrap();
        } catch (err) {
            Alert.alert('Hata', 'Görev güncellenirken bir hata oluştu');
        }
    };

    if (!task) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Yükleniyor...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{task.title}</Text>
                {task.category && (
                    <View style={styles.categoryContainer}>
                        <Text style={styles.category}>{task.category}</Text>
                    </View>
                )}
            </View>

            <View style={styles.content}>
                <Text style={styles.description}>{task.description}</Text>

                {task.dueDate && (
                    <View style={styles.infoRow}>
                        <Ionicons name="calendar-outline" size={20} color="#666" />
                        <Text style={styles.infoText}>
                            {new Date(task.dueDate).toLocaleDateString('tr-TR')}
                        </Text>
                    </View>
                )}

                <View style={styles.infoRow}>
                    <Ionicons name="time-outline" size={20} color="#666" />
                    <Text style={styles.infoText}>
                        Oluşturulma: {new Date(task.createdAt).toLocaleDateString('tr-TR')}
                    </Text>
                </View>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={[styles.button, styles.completeButton]}
                    onPress={handleToggleComplete}
                >
                    <Text style={styles.buttonText}>
                        {task.completed ? 'Tamamlanmadı' : 'Tamamlandı'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={() => navigation.navigate('TaskForm', { task })}
                >
                    <Text style={styles.buttonText}>Düzenle</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={handleDelete}
                >
                    <Text style={[styles.buttonText, styles.deleteButtonText]}>Sil</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
    },
    categoryContainer: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
        alignSelf: 'flex-start',
    },
    category: {
        fontSize: 14,
        color: '#666',
    },
    content: {
        padding: 16,
    },
    description: {
        fontSize: 16,
        color: '#333',
        marginBottom: 16,
        lineHeight: 24,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#666',
    },
    actions: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center',
    },
    completeButton: {
        backgroundColor: '#4CAF50',
    },
    editButton: {
        backgroundColor: '#007AFF',
    },
    deleteButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ff3b30',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    deleteButtonText: {
        color: '#ff3b30',
    },
}); 