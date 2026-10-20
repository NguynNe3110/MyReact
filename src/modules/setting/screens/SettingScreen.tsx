import { Keyboard, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '../../../theme/colors';
import ItemList from '../../../components/ItemList';
import { IcChevronRight, IcUser } from '../../../assets/icons';
import FormTextInputSetting from '../components/FormTextInputSetting';
import { useNavigation } from '@react-navigation/native';
import type { SettingScreenNavigationProp } from '../../../navigation/types';
import type { Profile } from '../../user/types';
import { RouteName } from '../../../config/navigation';
import { tokenStorage } from '../../../api/tokenStorage';

const SettingScreen = () => {
  const navigation = useNavigation<SettingScreenNavigationProp>();
  // Màn hình giữ dữ liệu để cả form và nút điều hướng cùng sử dụng.
  const [profile, setProfile] = useState<Profile>({
    name: '',
    email: '',
    phone: '',
  });

  function onInfoSelfPress() {
    Keyboard.dismiss();
    navigation.navigate(RouteName.InfoSelf, {
      profile,
    });
  }

  function onGetUserJsonHolder() {
    Keyboard.dismiss();
    navigation.navigate(RouteName.UserScreen);
  }

  async function onPressedButtonLogout() {
    Keyboard.dismiss();

    await tokenStorage.clearTokens();
    console.log(`[DEBUG] xoa token khoi keystore`);

    navigation.getParent()?.reset({
      index : 0, 
      routes: [{name: RouteName.Auth}],
    });
  } 

  return (
    <SafeAreaView style={styles.container} edges={['top','left', 'right', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
      >
        <View style={styles.card}>
          <FormTextInputSetting value={profile} onChange={setProfile} />
        </View>
        <View style={styles.card}>
          <ItemList
            title="Thông tin cá nhân"
            desctiption="Họ tên, email và số điện thoại"
            leading={
              <IcUser
                width={24}
                height={24}
                color={AppColors.text}
                accessible={false}
              />
            }
            trailing={
              <IcChevronRight
                width={20}
                height={20}
                color={AppColors.muted}
                accessible={false}
              />
            }
            onPress={onInfoSelfPress}
          />

          <ItemList
            title="Get api user jsonPlaceHolder"
            desctiption="Lấy danh sách người dùng"
            leading={
              <IcUser
                width={24}
                height={24}
                color={AppColors.text}
                accessible={false}
              />
            }
            trailing={
              <IcChevronRight
                width={20}
                height={20}
                color={AppColors.muted}
                accessible={false}
              />
            }
            onPress={onGetUserJsonHolder}
          />

          
          
          
        </View>
        <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
                // loading && styles.buttonDisabled,
              ]}
              onPress={onPressedButtonLogout}
              // disabled={loading}
            >
              {/* {loading ? (
                <ActivityIndicator color={AppColors.onPrimary} />
              ) : ( */}
                <Text style={styles.buttonText}>Đăng Xuất</Text>
              {/* )} */}
          </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.background,
    flex: 1,
  },
  content: {
    padding: 12,
    gap: 12,
  },
  card: {
    borderRadius: 12,
    backgroundColor: AppColors.surface,
    padding: 12,
    flexDirection: 'column',
    gap: 12,
  },

  buttonLogout: {
    backgroundColor: AppColors.error,
  },

  button: {
    minHeight: 50,
    backgroundColor: AppColors.error,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: { opacity: 0.6 },
  pressed: { opacity: 0.8 },
  buttonText: { color: AppColors.surface, fontSize: 16, fontWeight: '600' },
});
