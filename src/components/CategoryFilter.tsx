import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import { TaskCategory } from '../types/task';

interface CategoryFilterProps {
    categories: (TaskCategory | 'Tümü')[];
    selectedCategory: TaskCategory | 'Tümü';
    onCategoryChange: (category: TaskCategory | 'Tümü') => void;
}

export const CategoryFilter = ({
    categories,
    selectedCategory,
    onCategoryChange
}: CategoryFilterProps) => {

    const getCategoryIcon = (category: TaskCategory | 'Tümü'): string => {
        switch (category) {
            case 'Tümü':
                return 'apps';
            case 'İş':
                return 'briefcase';
            case 'Kişisel':
                return 'person';
            case 'Öğrenme':
                return 'book';
            case 'Diğer':
                return 'ellipsis-horizontal';
            default:
                return 'apps';
        }
    };

    const getCategoryColor = (category: TaskCategory | 'Tümü'): string => {
        switch (category) {
            case 'Tümü':
                return COLORS.primary;
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

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {categories.map((category) => {
                const isSelected = category === selectedCategory;
                const backgroundColor = isSelected
                    ? getCategoryColor(category)
                    : 'transparent';
                const textColor = isSelected ? COLORS.white : COLORS.textSecondary;
                const borderColor = isSelected
                    ? 'transparent'
                    : COLORS.border;

                return (
                    <TouchableOpacity
                        key={category}
                        style={[
                            styles.categoryButton,
                            { backgroundColor, borderColor }
                        ]}
                        onPress={() => onCategoryChange(category)}
                    >
                        <Ionicons
                            name={getCategoryIcon(category) as any}
                            size={16}
                            color={textColor}
                            style={styles.icon}
                        />
                        <Text style={[styles.categoryText, { color: textColor }]}>
                            {category}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        paddingHorizontal: 4,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginHorizontal: 4,
        borderWidth: 1,
    },
    icon: {
        marginRight: 6,
    },
    categoryText: {
        fontSize: SIZES.body5,
        fontWeight: '500',
    },
}); 