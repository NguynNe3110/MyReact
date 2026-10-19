import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
// tạo navigator quản lý các màn hình theo ngăn xếp, sử dụng cơ chế native stack
// <RootStackParamList> là Generic Type để TypeScript biết các route hợp lệ và kiểu params của chúng.
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    // container là nơi quản lý navigation state của cây navigator
    <NavigationContainer>
      {/* Quản lý navigation tree và navigation state ở cấp ứng dụng. */}
      <Stack.Navigator  // quản lý các route theo cơ chế stack
        initialRouteName={RouteName.BottomBarStack}
      >
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

        <Stack.Screen
          name={RouteName.Login}
          component={LoginScreen}
        />

        <Stack.Screen
          name={RouteName.Register}
          component={RegisterScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
