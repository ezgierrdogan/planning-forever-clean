import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { DrawerParamList } from '../types/navigation';
import { TaskNavigator } from './TaskNavigator';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { logout } from '../store/slices/authSlice';
import { CustomDrawerContent } from '../components/CustomDrawerContent';
import { RootState, AppDispatch } from '../store';

const Drawer = createDrawerNavigator<DrawerParamList>();

export const DrawerNavigator = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <Drawer.Navigator
            drawerContent={(props) => (
                <CustomDrawerContent
                    {...props}
                    user={user!}
                    onLogout={() => dispatch(logout())}
                />
            )}
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTintColor: '#333',
                drawerActiveTintColor: '#007AFF',
                drawerInactiveTintColor: '#666',
            }}
        >
            <Drawer.Screen
                name="Tasks"
                component={TaskNavigator}
                options={{
                    title: 'Görevler',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="list" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: 'Profil',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};