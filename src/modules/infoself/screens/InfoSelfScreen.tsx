import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '../../../theme/colors';
import AppTextField from '../../../components/AppTextField';

const InfoSelfScreen = () => {
const [fullName, setFullName] = useState('');
  const[email, setEmail] = useState('');
  const[phone, setPhone] = useState('');

  const [error, setError] = useState(
    {
      fullName: '',
      email: '',
    }
  );

  return (
    <>
      <StatusBar
        barStyle="dark-content" // giúp hiển thị bar state 
        hidden={false}
      />

      <SafeAreaView
        style={styles.container}
        edges={['left', 'right', 'bottom', 'top']}
      >
        <ScrollView
          style = {styles.scroll}
          contentContainerStyle = {styles.content}
          automaticallyAdjustKeyboardInsets
          >
          <Text style = {styles.title}>Thông tin cá nhân</Text>

          <AppTextField
            label='Họ và tên'
            accessibilityLabel = 'Họ tên' // trình đọc màn hình
            placeholder='Nguyễn Văn B'
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize='words' // tự động viết hoa mỗi từ
            error={error.fullName}
            cursorColor={AppColors.primary} // màu của con trỏ nhập liệu
            selectionColor={AppColors.primary}
          />

          <AppTextField
            label='Email'
            accessibilityLabel='Email'
            placeholder='a@example.com'
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
            autoCorrect= {false} // tự động sửa chính tả
            error={error.email}
          />

          <AppTextField
            label='Số điện thoại'
            accessibilityLabel='Phone'
            placeholder='Số điện thoại'
            value={phone}
            onChangeText={setPhone}
            keyboardType='phone-pad'
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