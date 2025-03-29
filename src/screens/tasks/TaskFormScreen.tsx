import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
    TouchableOpacity,
    Text,
    Switch,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TaskStackParamList } from '../../types/navigation';
import { RootState, AppDispatch } from '../../store';
import { createTask, updateTask } from '../../store/slices/taskSlice';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { TaskCategory } from '../../types/task';
import { notificationService } from '../../services/notificationService';

type TaskFormScreenRouteProp = RouteProp<TaskStackParamList, 'TaskForm'>;
type TaskFormScreenNavigationProp = NativeStackNavigationProp<TaskStackParamList, 'TaskForm'>;

export const TaskFormScreen = () => {
    const navigation = useNavigation<TaskFormScreenNavigationProp>();
    const route = useRoute<TaskFormScreenRouteProp>();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);
    const { task } = route.params || {};

    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [category, setCategory] = useState<TaskCategory | undefined>(task?.category as TaskCategory | undefined);
    const [dueDate, setDueDate] = useState<Date | undefined>(
        task?.dueDate ? new Date(task.dueDate) : undefined
    );
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [enableNotification, setEnableNotification] = useState(true);
    const [hasNotificationPermission, setHasNotificationPermission] = useState(false);

    const categories: TaskCategory[] = ['İş', 'Kişisel', 'Öğrenme', 'Diğer'];

    useEffect(() => {
        checkNotificationPermissions();
    }, []);

    const checkNotificationPermissions = async () => {
        const hasPermission = await notificationService.requestPermissions();
        setHasNotificationPermission(hasPermission);
    };

    const handleSubmit = async () => {
        if (!title || !description) {
            Alert.alert('Hata', 'Lütfen başlık ve açıklama alanlarını doldurun');
            return;
        }

        if (!user) {
            Alert.alert('Hata', 'Kullanıcı bilgisi bulunamadı');
            return;
        }

        try {
            const taskData = {
                title,
                description,
                category,
                dueDate,
                completed: false,
                userId: user.id,
            };

            let savedTask;
            if (task) {
                const result = await dispatch(
                    updateTask({
                        taskId: task.id,
                        updates: taskData,
                    })
                ).unwrap();
                savedTask = { ...task, ...taskData };
            } else {
                savedTask = await dispatch(createTask(taskData)).unwrap();
            }

            // Bildirim ayarla
            if (enableNotification && hasNotificationPermission && dueDate) {
                await notificationService.scheduleTaskNotification(savedTask);
            }

            navigation.goBack();
        } catch (err) {
            Alert.alert('Hata', 'Görev kaydedilirken bir hata oluştu');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <CustomInput
                    label="Başlık"
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Görev başlığını girin"
                />

                <CustomInput
                    label="Açıklama"
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Görev açıklamasını girin"
                    multiline
                    numberOfLines={4}
                />

                <View style={styles.categoryContainer}>
                    <Text style={styles.label}>Kategori</Text>
                    <View style={styles.categoryButtons}>
                        {categories.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.categoryButton,
                                    category === cat && styles.selectedCategory,
                                ]}
                                onPress={() => setCategory(cat)}
                            >
                                <Text
                                    style={[
                                        styles.categoryButtonText,
                                        category === cat && styles.selectedCategoryText,
                                    ]}
                                >
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.dateContainer}>
                    <Text style={styles.label}>Bitiş Tarihi</Text>
                    <TouchableOpacity
                        style={styles.dateButton}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text style={styles.dateButtonText}>
                            {dueDate
                                ? new Date(dueDate).toLocaleDateString('tr-TR')
                                : 'Tarih Seçin'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {dueDate && hasNotificationPermission && (
                    <View style={styles.notificationContainer}>
                        <Text style={styles.label}>Bildirim</Text>
                        <View style={styles.notificationSwitch}>
                            <Text style={styles.notificationText}>
                                Bitiş tarihinde bildirim al
                            </Text>
                            <Switch
                                value={enableNotification}
                                onValueChange={setEnableNotification}
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={enableNotification ? '#007AFF' : '#f4f3f4'}
                            />
                        </View>
                    </View>
                )}

                {showDatePicker && (
                    <DateTimePicker
                        value={dueDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) {
                                setDueDate(selectedDate);
                            }
                        }}
                    />
                )}

                <CustomButton
                    title={task ? 'Görevi Güncelle' : 'Görev Oluştur'}
                    onPress={handleSubmit}
                    style={styles.submitButton}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    form: {
        padding: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
        fontWeight: '500',
    },
    categoryContainer: {
        marginBottom: 16,
    },
    categoryButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        margin: 4,
    },
    selectedCategory: {
        backgroundColor: '#007AFF',
    },
    categoryButtonText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '500',
    },
    selectedCategoryText: {
        color: '#fff',
    },
    dateContainer: {
        marginBottom: 16,
    },
    dateButton: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
    },
    dateButtonText: {
        fontSize: 16,
        color: '#333',
    },
    notificationContainer: {
        marginBottom: 16,
    },
    notificationSwitch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    notificationText: {
        fontSize: 16,
        color: '#333',
    },
    submitButton: {
        marginTop: 24,
    },
}); 