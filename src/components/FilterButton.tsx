import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

interface FilterButtonProps {
    showCompleted: boolean;
    onToggle: () => void;
}

export const FilterButton = ({ showCompleted, onToggle }: FilterButtonProps) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onToggle}
            activeOpacity={0.7}
        >
            <Ionicons
                name={showCompleted ? 'eye-off-outline' : 'eye-outline'}
                size={18}
                color={COLORS.primary}
                style={styles.icon}
            />
            <Text style={styles.text}>
                {showCompleted ? 'Tamamlananları Gizle' : 'Tamamlananları Göster'}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primaryLight + '20', // %20 opacity
        marginVertical: 12,
    },
    icon: {
        marginRight: 6,
    },
    text: {
        color: COLORS.primary,
        fontSize: SIZES.body4,
        fontWeight: '500',
    },
}); 