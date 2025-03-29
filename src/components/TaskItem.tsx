import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../types/task';
import { COLORS, SIZES, STYLES } from '../constants/theme';

interface TaskItemProps {
    task: Task;
    onPress: () => void;
    onToggleComplete: () => void;
}

export const TaskItem = ({ task, onPress, onToggleComplete }: TaskItemProps) => {
    const formattedDate = task.dueDate
        ? new Date(task.dueDate).toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'short',
        })
        : null;

    return (
        <TouchableOpacity
            style={[styles.container, task.completed && styles.completedTask]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={onToggleComplete}
            >
                <View style={[
                    styles.checkbox,
                    task.completed && styles.checkboxChecked
                ]}>
                    {task.completed && (
                        <Ionicons name="checkmark" size={16} color={COLORS.white} />
                    )}
                </View>
            </TouchableOpacity>

            <View style={styles.contentContainer}>
                <View style={styles.titleRow}>
                    <Text
                        style={[
                            styles.title,
                            task.completed && styles.completedText
                        ]}
                        numberOfLines={1}
                    >
                        {task.title}
                    </Text>

                    {task.category && (
                        <View style={[
                            styles.categoryBadge,
                            { backgroundColor: getCategoryColor(task.category) }
                        ]}>
                            <Text style={styles.categoryText}>{task.category}</Text>
                        </View>
                    )}
                </View>

                {task.description && (
                    <Text
                        style={[
                            styles.description,
                            task.completed && styles.completedText
                        ]}
                        numberOfLines={1}
                    >
                        {task.description}
                    </Text>
                )}

                {formattedDate && (
                    <View style={styles.dateRow}>
                        <Ionicons name="calendar-outline" size={14} color={COLORS.textMuted} />
                        <Text style={styles.dateText}>{formattedDate}</Text>
                    </View>
                )}
            </View>

            <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.textMuted}
                style={styles.chevron}
            />
        </TouchableOpacity>
    );
};

const getCategoryColor = (category: string): string => {
    switch (category) {
        case 'İş':
            return '#4F46E5';
        case 'Kişisel':
            return '#EC4899';
        case 'Öğrenme':
            return '#10B981';
        case 'Diğer':
            return '#F59E0B';
        default:
            return COLORS.primary;
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        ...STYLES.shadow,
    },
    completedTask: {
        opacity: 0.7,
        backgroundColor: COLORS.light,
    },
    checkboxContainer: {
        marginRight: 12,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    contentContainer: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: SIZES.h4,
        fontWeight: '600',
        color: COLORS.textPrimary,
        flex: 1,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: COLORS.textMuted,
    },
    description: {
        fontSize: SIZES.body5,
        color: COLORS.textSecondary,
        marginBottom: 8,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        fontSize: SIZES.small,
        color: COLORS.textMuted,
        marginLeft: 4,
    },
    categoryBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginLeft: 8,
    },
    categoryText: {
        fontSize: SIZES.small,
        color: COLORS.white,
        fontWeight: '500',
    },
    chevron: {
        marginLeft: 10,
    }
}); 