
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import { AppColors } from '../../../theme/colors'
import { useNavigation } from '@react-navigation/native'
import { useLogin } from './useLogin'
import { RouteName } from '../../../config/navigation'
import AppTextField from '../../../components/AppTextField';

const LoginScreen = () => {
    const navigation = useNavigation<any>();

    const {loading, error, login} = useLogin();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [formError, setFormError] = useState<
    {
        username ?: string;
        password ?: string;
    }> ({});

    const validate = (): boolean => {
        const errors: {username ?: string; password ?: string } = {};

        if(!username.trim()) {
            errors.username = 'Thông tin không được để trống!';
        } else if(!password.trim()) {
            errors.password = 'Thông tin không được để trống!';
        } else if (password.length < 4) {
            errors.password = 'Mật khẩu phải từ 4 ký tự trở lên';
        }

        setFormError(errors);

        // neu object errors k cos key nao nghia la hop le
        return Object.keys(errors).length === 0;
    }

    const  handleLogin = async () => {
        if(!validate()) return;

        const result = await login({username, password});

        if(result) {
            Alert.alert('Thành công', 'Đăng nhập thành công!');
            navigation.navigate(RouteName.BottomBarStack);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
            <KeyboardAvoidingView
                style = {styles.flex}
                behavior={Platform.OS === 'ios'? 'padding' : undefined}>
                <ScrollView
                    contentContainerStyle = {styles.scrollContent}
                    keyboardShouldPersistTaps='handled'>

                        <View style={styles.header}>
                            <Text style={styles.title}>Chào mừng trở lại!</Text>
                            <Text style={styles.subtitle}>Đăng nhập để tiếp tục trải nghiệm</Text>
                        </View>

                        {error && (
                            <View style={styles.serverErrorBox}>
                                <Text style={styles.serverErrorText}>{error.message}</Text>
                            </View>
                        )}

                        <View style = {styles.form}>
                            <AppTextField
                                label='Username'
                                placeholder='username'
                                value={username}
                                onChangeText={(text) => {
                                    setUsername(text);
                                    if(formError.username) setFormError((prev) => ({...prev, username: undefined}));
                                }}
                                error = {formError.username}
                            />

                            <AppTextField
                                label="Mật khẩu"
                                placeholder="Nhập mật khẩu"
                                secureTextEntry
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    if (formError.password) setFormError((prev) => ({ ...prev, password: undefined }));
                                }}
                                error={formError.password}
                            />

                            <Pressable
                                style= {({pressed}) => [
                                    styles.button, 
                                    pressed && styles.pressed, 
                                    loading && styles.buttonDisabled,

                                ]}
                                onPress={handleLogin}
                                disabled = {loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color={AppColors.primary}/>

                                ) : (
                                    <Text style= {styles.buttonText}>Đăng Nhập</Text>
                                )}
                            </Pressable>

                            <View style= {styles.footerRow}>
                                <Text style= {styles.footerText}>Chưa có tài khoản?</Text>
                                <Pressable onPress={() => navigation.navigate(RouteName.Register)}>
                                    <Text style={styles.linkText}>Đăng kí ngay</Text>
                                </Pressable>
                            </View>
                        </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: AppColors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: AppColors.muted,
  },
  serverErrorBox: {
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  serverErrorText: {
    color: AppColors.error,
    fontSize: 14,
  },
  form: {
    gap: 8,
  },
  button: {
    minHeight: 50,
    backgroundColor: AppColors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: AppColors.onPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: AppColors.muted,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.primary,
  },
});