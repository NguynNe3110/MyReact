import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RootStackParamList } from './types';
import BottomTabNavigator from './BottomTabNavigator';
import DetailScreen from '../modules/detail/DetailScreen';
import { RouteName } from '../config/navigation';

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
          name={RouteName.Detail}
          component={DetailScreen}
          options={{
            title: 'Chi tiết người dùng',
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
