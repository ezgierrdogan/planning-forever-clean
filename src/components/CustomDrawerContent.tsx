import React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { User } from '../types/auth';

interface CustomDrawerContentProps extends DrawerContentComponentProps {
    user: User;
    onLogout: () => void;
}

export const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({
    user,
    onLogout,
    ...props
}) => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.userSection}>
                <View style={styles.avatarContainer}>
                    {user.photoURL ? (
                        <Image source={{ uri: user.photoURL }} style={styles.avatar} />
                    ) : (
                        <View style={[styles.avatar, styles.defaultAvatar]}>
                            <Text style={styles.avatarText}>
                                {user.displayName?.[0] || user.email[0]}
                            </Text>
                        </View>
                    )}
                </View>
                <Text style={styles.userName}>{user.displayName || user.email}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
            </View>

            <DrawerItemList {...props} />

            <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                <Ionicons name="log-out-outline" size={24} color="#ff3b30" />
                <Text style={styles.logoutText}>Çıkış Yap</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    userSection: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: 8,
    },
    avatarContainer: {
        marginBottom: 12,
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    defaultAvatar: {
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#fff',
        fontSize: 32,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    userName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
        textAlign: 'center',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginTop: 8,
    },
    logoutText: {
        marginLeft: 32,
        color: '#ff3b30',
        fontSize: 16,
        fontWeight: '500',
    },
}); 