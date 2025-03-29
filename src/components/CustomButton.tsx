import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';

export interface CustomButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    style?: ViewStyle;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    loading = false,
    variant = 'primary',
    disabled = false,
    style
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                variant === 'secondary' && styles.secondaryButton,
                disabled && styles.disabledButton,
                style
            ]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? '#fff' : '#007AFF'} />
            ) : (
                <Text style={[
                    styles.text,
                    variant === 'secondary' && styles.secondaryText,
                    disabled && styles.disabledText
                ]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 48,
        borderRadius: 8,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    disabledButton: {
        backgroundColor: '#ccc',
        borderColor: '#ccc',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryText: {
        color: '#007AFF',
    },
    disabledText: {
        color: '#666',
    },
}); 