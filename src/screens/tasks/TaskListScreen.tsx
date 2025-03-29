import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { TaskStackParamList } from '../../types/navigation';
import { RootState, AppDispatch } from '../../store';
import { fetchTasks, updateTask } from '../../store/slices/taskSlice';
import { Task, TaskCategory } from '../../types/task';
import { COLORS, SIZES, STYLES } from '../../constants/theme';
import { TaskItem } from '../../components/TaskItem';
import { CategoryFilter } from '../../components/CategoryFilter';
import { FilterButton } from '../../components/FilterButton';

type TaskListScreenNavigationProp = NativeStackNavigationProp<TaskStackParamList, 'TaskList'>;

export const TaskListScreen = () => {
    const navigation = useNavigation<TaskListScreenNavigationProp>();
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, loading } = useSelector((state: RootState) => state.tasks);
    const user = useSelector((state: RootState) => state.auth.user);
    const [selectedCategory, setSelectedCategory] = useState<TaskCategory | 'Tümü'>('Tümü');
    const [showCompleted, setShowCompleted] = useState(false);

    useEffect(() => {
        if (user) {
            dispatch(fetchTasks(user.id));
        }
    }, [dispatch, user]);

    const categories: (TaskCategory | 'Tümü')[] = ['Tümü', 'İş', 'Kişisel', 'Öğrenme', 'Diğer'];

    const filteredTasks = tasks.filter(task => {
        const categoryMatch = selectedCategory === 'Tümü' || task.category === selectedCategory;
        const completedMatch = showCompleted ? true : !task.completed;
        return categoryMatch && completedMatch;
    });

    const handleTaskPress = (taskId: string) => {
        navigation.navigate('TaskDetail', { taskId });
    };

    const handleToggleComplete = (task: Task) => {
        dispatch(updateTask({
            taskId: task.id,
            updates: { completed: !task.completed }
        }));
    };

    const renderEmptyList = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="checkmark-done-circle-outline" size={80} color={COLORS.textMuted} />
            <Text style={styles.emptyTitle}>Görev Bulunamadı</Text>
            <Text style={styles.emptyText}>
                {selectedCategory !== 'Tümü'
                    ? `"${selectedCategory}" kategorisinde görev bulunmamaktadır.`
                    : showCompleted
                        ? 'Henüz tamamlanmış görev bulunmamaktadır.'
                        : 'Görev listeniz boş görünüyor. Yeni görev ekleyin!'}
            </Text>
        </View>
    );

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Görevlerim</Text>
            <Text style={styles.headerSubtitle}>
                {filteredTasks.length} {filteredTasks.length === 1 ? 'görev' : 'görev'} listeleniyor
            </Text>
        </View>
    );

    if (loading && tasks.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
            <View style={styles.container}>
                {renderHeader()}

                <View style={styles.filterContainer}>
                    <CategoryFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                    />
                    <FilterButton
                        showCompleted={showCompleted}
                        onToggle={() => setShowCompleted(!showCompleted)}
                    />
                </View>

                <FlatList
                    data={filteredTasks}
                    renderItem={({ item }) => (
                        <TaskItem
                            task={item}
                            onPress={() => handleTaskPress(item.id)}
                            onToggleComplete={() => handleToggleComplete(item)}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.taskList}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={renderEmptyList}
                />

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('TaskForm', { task: undefined })}
                >
                    <Ionicons name="add" size={30} color={COLORS.white} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    header: {
        padding: SIZES.padding,
        paddingBottom: 0,
    },
    headerTitle: {
        fontSize: SIZES.h1,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    headerSubtitle: {
        fontSize: SIZES.body4,
        color: COLORS.textSecondary,
        marginTop: 4,
    },
    filterContainer: {
        paddingHorizontal: SIZES.padding,
    },
    taskList: {
        padding: SIZES.padding,
        paddingTop: 0,
        flexGrow: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
        paddingHorizontal: SIZES.padding,
    },
    emptyTitle: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginTop: 16,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: SIZES.body4,
        color: COLORS.textSecondary,
        textAlign: 'center',
        maxWidth: 300,
    },
    addButton: {
        position: 'absolute',
        right: SIZES.padding,
        bottom: SIZES.padding,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...STYLES.buttonShadow,
    },
}); 