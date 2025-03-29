import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { RootState, AppDispatch } from '../../store';
import { updateProfile } from '../../store/slices/authSlice';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';

export const ProfileScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);
    const [isEditing, setIsEditing] = useState(false);
    const [displayName, setDisplayName] = useState(user?.displayName || '');

    const handleUpdateProfile = async () => {
        if (!user) return;

        try {
            await dispatch(updateProfile({
                userId: user.id,
                updates: {
                    displayName,
                }
            })).unwrap();

            setIsEditing(false);
            Alert.alert('Başarılı', 'Profil bilgileriniz güncellendi');
        } catch (error) {
            Alert.alert('Hata', 'Profil güncellenirken bir hata oluştu');
        }
    };

    if (!user) {
        return (
            <View style={styles.container}>
                <Text>Kullanıcı bilgisi bulunamadı</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={
                        user.photoURL
                            ? { uri: user.photoURL }
                            : require('../../../assets/default-avatar.png')
                    }
                    style={styles.avatar}
                />
                {!isEditing ? (
                    <>
                        <Text style={styles.name}>{user.displayName || 'İsimsiz Kullanıcı'}</Text>
                        <Text style={styles.email}>{user.email}</Text>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => setIsEditing(true)}
                        >
                            <Ionicons name="pencil" size={24} color="#007AFF" />
                            <Text style={styles.editButtonText}>Profili Düzenle</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <View style={styles.form}>
                        <CustomInput
                            label="İsim"
                            value={displayName}
                            onChangeText={setDisplayName}
                            placeholder="İsminizi girin"
                        />
                        <View style={styles.buttonContainer}>
                            <CustomButton
                                title="İptal"
                                onPress={() => {
                                    setDisplayName(user.displayName || '');
                                    setIsEditing(false);
                                }}
                                style={styles.cancelButton}
                            />
                            <CustomButton
                                title="Kaydet"
                                onPress={handleUpdateProfile}
                                style={styles.saveButton}
                            />
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        padding: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    editButtonText: {
        marginLeft: 8,
        color: '#007AFF',
        fontSize: 16,
    },
    form: {
        width: '100%',
        marginTop: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    cancelButton: {
        flex: 1,
        marginRight: 8,
        backgroundColor: '#f0f0f0',
    },
    saveButton: {
        flex: 1,
        marginLeft: 8,
    },
}); 