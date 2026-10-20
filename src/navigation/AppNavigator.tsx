import React, { useEffect, useState } from 'react';
import { NavigationContainer, Route } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RootStackParamList } from './types';
import BottomTabNavigator from './BottomTabNavigator';
import DetailScreen, { DetailUserScreen } from '../modules/detail-user/DetailUserScreen';
import { RouteName } from '../config/navigation';
import InfoSelfScreen from '../modules/infoself/screens/InfoSelfScreen';
import DetailProductScreen from '../modules/detail-product/DetailProductScreen';
import UserScreen from '../modules/user/screen/UserScreen';
import LoginScreen from '../modules/auth/login/LoginScreen';
import RegisterScreen from '../modules/auth/register/RegisterScreen';
import AuthNavigator from './AuthNavigator';
import { tokenStorage } from '../api/tokenStorage';
import { ActivityIndicator, View } from 'react-native';
import { AppColors } from '../theme/colors';
// tạo navigator quản lý các màn hình theo ngăn xếp, sử dụng cơ chế native stack
// <RootStackParamList> là Generic Type để TypeScript biết các route hợp lệ và kiểu params của chúng.
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>(RouteName.Auth);

  useEffect(() => {
    async function checkAuth() {
      try {
        const token = await tokenStorage.getAccessToken();
        if(token) { // cos thi vao home
          setInitialRoute(RouteName.BottomBarStack);
        } else { // k cos thi ngoai home
          setInitialRoute(RouteName.Auth)
        }
      } catch(e) {
        setInitialRoute(RouteName.Auth);
      } finally {
        setIsLoading(false);
      }
    }

  checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: AppColors.background }}>
        <ActivityIndicator size="large" color={AppColors.primary} />
      </View>
    );
  }

  return (
    // container là nơi quản lý navigation state của cây navigator
    <NavigationContainer>
      {/* Quản lý navigation tree và navigation state ở cấp ứng dụng. */}
      <Stack.Navigator  // quản lý các route theo cơ chế stack
        initialRouteName={initialRoute}>
        <Stack.Screen // đăng kí 1 route với stack navigator
          name={RouteName.BottomBarStack}
          component={BottomTabNavigator}
          options={{
            headerShown: false // phải ẩn đi,tránh hiển thị đè
          }}
        />

        <Stack.Screen
          name={RouteName.DetailUser}
          component={DetailUserScreen}
          options={{
            title: 'Chi tiết người dùng',
          }}
        />

        <Stack.Screen
          name={RouteName.InfoSelf}
          component={InfoSelfScreen}
          options={{
            title: 'Thông tin của tôi'
          }}
        />

        <Stack.Screen
          name={RouteName.UserScreen}
          component={UserScreen}
          options={{
            title: 'Danh sách user'
          }}
        />
        {
          // màn hình chi tiết sản phẩm, navigate home -> 
        }
        <Stack.Screen 
          name={RouteName.DetailProduct}
          component={DetailProductScreen}
          // thu bo qua option
        />

        {/* <Stack.Screen
          name={RouteName.Login}
          component={LoginScreen}
        />

        <Stack.Screen
          name={RouteName.Register}
          component={RegisterScreen}
        /> */}

        <Stack.Screen
          name={RouteName.Auth}
          component={AuthNavigator}
          options={{headerShown: false}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
