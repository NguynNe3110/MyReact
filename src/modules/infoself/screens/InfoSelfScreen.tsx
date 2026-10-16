import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { ScrollView, StatusBar, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '../../../theme/colors';
import AppTextField from '../../../components/AppTextField';
import type { InfoSelfScreenRouteProp } from '../../../navigation/types';

export default function InfoSelfScreen() {
  const route = useRoute<InfoSelfScreenRouteProp>();
  // Params cung cấp giá trị ban đầu cho bản đang chỉnh sửa ở màn này.
  const { profile } = route.params;
  const [fullName, setFullName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);

  return (
    <>
      <StatusBar
        barStyle="dark-content" // giúp hiển thị bar state
        hidden={false}
      />

      <SafeAreaView
        style={styles.container}
        edges={['left', 'right', 'bottom']}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          automaticallyAdjustKeyboardInsets
        >
          <Text style={styles.title}>Thông tin cá nhân</Text>

          <AppTextField
            label="Họ và tên"
            accessibilityLabel="Họ tên" // trình đọc màn hình
            placeholder="Nguyễn Văn B"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words" // tự động viết hoa mỗi từ
            cursorColor={AppColors.primary} // màu của con trỏ nhập liệu
            selectionColor={AppColors.primary}
          />

          <AppTextField
            label="Email"
            accessibilityLabel="Email"
            placeholder="a@example.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false} // tự động sửa chính tả
            keyboardType="email-address"
          />

          <AppTextField
            label="Số điện thoại"
            accessibilityLabel="Phone"
            placeholder="Số điện thoại"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    marginBottom: 24,
    fontSize: 22,
    fontWeight: '700',
    color: AppColors.text,
  },
  button: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: AppColors.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.onPrimary,
  },
  pressed: {
    opacity: 0.75,
  },
});
