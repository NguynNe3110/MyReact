import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AppTextField from '../../../components/AppTextField';
import { AppColors } from '../../../theme/colors';
import { RouteName } from '../../../config/navigation';
import { useRegister } from './useRegister';
import { Snackbar } from '../../../components/Snackbar';

export default function RegisterScreen() {
  const navigation = useNavigation<any>();
  const { loading, error, register } = useRegister();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!name.trim()) errors.name = 'Vui lòng nhập tên đăng nhập';
    if (!email.trim()) errors.email = 'Vui lòng nhập email';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email không hợp lệ';

    if (!password) errors.password = 'Vui lòng nhập mật khẩu';
    else if (password.length < 8) errors.password = 'Mật khẩu tối thiểu 8 ký tự';

    if (confirmPassword !== password) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    const result = await register({ name, email, password });
    if (result) {
      Alert.alert('Thành công', 'Đăng ký tài khoản thành công! Vui lòng đăng nhập.', [
        { text: 'OK', onPress: () => navigation.navigate(RouteName.Login) },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Tạo tài khoản</Text>
            <Text style={styles.subtitle}>Đăng ký để bắt đầu trải nghiệm</Text>
          </View>

          {error && (
            <View style={styles.serverErrorBox}>
              <Text style={styles.serverErrorText}>{error.message}</Text>
            </View>
          )}

          <View style={styles.form}>
            <AppTextField
              label="Name"
              placeholder="Nhập tên"
              autoCapitalize="none"
              value={name}
              onChangeText={(t) => {
                setName(t);
                if (formErrors.name) setFormErrors((p) => ({ ...p, name: '' }));
              }}
              error={formErrors.name}
            />

            <AppTextField
              label="Email"
              placeholder="example@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                if (formErrors.email) setFormErrors((p) => ({ ...p, email: '' }));
              }}
              error={formErrors.email}
            />

            <AppTextField
              label="Mật khẩu"
              placeholder="Tối thiểu 6 ký tự"
              secureTextEntry
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                if (formErrors.password) setFormErrors((p) => ({ ...p, password: '' }));
              }}
              error={formErrors.password}
            />

            <AppTextField
              label="Xác nhận mật khẩu"
              placeholder="Nhập lại mật khẩu"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(t) => {
                setConfirmPassword(t);
                if (formErrors.confirmPassword) setFormErrors((p) => ({ ...p, confirmPassword: '' }));
              }}
              error={formErrors.confirmPassword}
            />

            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
                loading && styles.buttonDisabled,
              ]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={AppColors.onPrimary} />
              ) : (
                <Text style={styles.buttonText}>Đăng ký</Text>
              )}
            </Pressable>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Đã có tài khoản? </Text>
              <Pressable onPress={() => navigation.navigate(RouteName.Login)}>
                <Text style={styles.linkText}>Đăng nhập</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppColors.background },
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  header: { marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '700', color: AppColors.text, marginBottom: 8 },
  subtitle: { fontSize: 16, color: AppColors.muted },
  serverErrorBox: {
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  serverErrorText: { color: AppColors.error, fontSize: 14 },
  form: { gap: 6 },
  button: {
    minHeight: 50,
    backgroundColor: AppColors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: { opacity: 0.6 },
  pressed: { opacity: 0.8 },
  buttonText: { color: AppColors.onPrimary, fontSize: 16, fontWeight: '600' },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: { fontSize: 14, color: AppColors.muted },
  linkText: { fontSize: 14, fontWeight: '600', color: AppColors.primary },
});
