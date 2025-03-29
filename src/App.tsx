import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './store';
import { RootNavigator } from './navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { notificationService } from './services/notificationService';

export default function App() {
    useEffect(() => {
        const setupNotifications = async () => {
            await notificationService.requestPermissions();
        };

        setupNotifications();
    }, []);

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <StatusBar style="auto" />
                <RootNavigator />
            </SafeAreaProvider>
        </Provider>
    );
} 