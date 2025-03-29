import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { login } from '../../store/slices/authSlice';
import { RootState, AppDispatch } from '../../store';
import { AuthStackParamList } from '../../types/navigation';
import { COLORS, SIZES, STYLES } from '../../constants/theme';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export const LoginScreen = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
            return;
        }

        try {
            await dispatch(login({ email, password })).unwrap();
        } catch (err) {
            Alert.alert('Hata', 'Giriş yapılırken bir hata oluştu');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground
                source={require('../../../assets/images/logo.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                >
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.title}>Planning Forever</Text>
                            <Text style={styles.subtitle}>Görevlerinizi yönetin, zamanınızı planlayın</Text>
                        </View>

                        <View style={styles.formContainer}>
                            <CustomInput
                                label="E-posta"
                                value={email}
                                onChangeText={setEmail}
                                placeholder="E-posta adresinizi girin"
                                error={error || undefined}
                                containerStyle={styles.inputContainer}
                                style={styles.input}
                                placeholderTextColor={COLORS.authPlaceholder}
                            />
                            <CustomInput
                                label="Şifre"
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Şifrenizi girin"
                                secureTextEntry
                                error={error || undefined}
                                containerStyle={styles.inputContainer}
                                style={styles.input}
                                placeholderTextColor={COLORS.authPlaceholder}
                            />
                            <CustomButton
                                title="Giriş Yap"
                                onPress={handleLogin}
                                loading={loading}
                                style={styles.loginButton}
                            />

                            <View style={styles.registerContainer}>
                                <Text style={styles.registerText}>Hesabınız yok mu?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                    <Text style={styles.registerLink}>Hesap Oluştur</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: SIZES.padding,
        justifyContent: 'center',
    },
    headerContainer: {
        marginBottom: SIZES.padding * 2,
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: SIZES.h1,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: SIZES.base,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    subtitle: {
        fontSize: SIZES.body3,
        color: COLORS.textSecondary,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0.5, height: 0.5 },
        textShadowRadius: 1,
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        ...STYLES.shadow,
        width: '90%',
        alignSelf: 'center',
        zIndex: 10,
    },
    inputContainer: {
        marginBottom: SIZES.margin,
    },
    input: {
        backgroundColor: COLORS.authInput,
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding / 2,
        color: COLORS.textPrimary,
    },
    loginButton: {
        backgroundColor: COLORS.authButton,
        borderRadius: SIZES.radius,
        paddingVertical: SIZES.padding / 1.5,
        marginTop: SIZES.margin,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SIZES.margin,
        paddingTop: SIZES.padding / 2,
    },
    registerText: {
        color: COLORS.textSecondary,
        marginRight: SIZES.base / 2,
    },
    registerLink: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
}); 