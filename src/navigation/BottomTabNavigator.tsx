import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../modules/home/screens/HomeScreen';
import SettingScreen from '../modules/setting/screens/SettingScreen';
import { AppColors } from '../theme/colors';
import { RouteName } from '../config/navigation';
import CartScreen from '../modules/cart/screens/CartScreen';

//hàm create sẽ trả về đói tượng gồm Navigator, Screen, Group
const Tab = createBottomTabNavigator<BottomTabParamList>();

// type mô tả danh sách màn hình và tham số của nó
export type BottomTabParamList = {
  // các route thuộc bottom tabs
  [RouteName.Home]: undefined; // underfined là k yêu cầu tham số
  [RouteName.Cart]: undefined; //setting là tên màn hình
  [RouteName.Setting]: undefined;
  // khi dùng thì navigation.navigate('Home');
};

//trường hợp muốn nhận tham số
// export type BottomTabParamList = {
//   Home: { userId: number };
//   Setting: undefined;
// };

//khi truyền thì navigation.navigate('Home', {userId: 10});


export default function BottomTabNavigator() { // bản chât là component
  return (
    <Tab.Navigator
      initialRouteName={RouteName.Home} // xác định tab mặc định khi khởi tạo
      backBehavior="history" // lưu lịch sử tab để phục vụ thao tác quay lại.
      screenOptions={{ //để cấu hình mặc định cho các màn hinh thuộc navigator
        headerShown: true, // hiển thị hoặc ẩn header
        tabBarActiveTintColor: AppColors.primary,
        tabBarInactiveTintColor: AppColors.muted,
        tabBarStyle: {
          backgroundColor: AppColors.surface,
          borderTopColor: AppColors.border,
        },
      }}
    >
      <Tab.Screen //có thể ghi đè một số cấu hình này cho từng Tab.Screen bằng options.
        name={RouteName.Home} // tên phải giống tên đã khai báo trong BottomTabParamList
        component={HomeScreen}
        options={{
          title: 'Trang chủ',
          tabBarLabel: 'Trang chủ',
        }}
      />

      <Tab.Screen
        name={RouteName.Cart} // tên route dùng trong navigate()
        component={CartScreen}
        options={{
          title: 'Giỏ hàng', // tiêu đề của màn hình (xuất hiện ở header)
          tabBarLabel: 'Giỏ hàng', // chữ hiển thị trên thanh tab
        }}
      />

      <Tab.Screen
        name={RouteName.Setting}
        component={SettingScreen}
        options={{
          title:'Cài đặt',
          tabBarLabel: 'Cài đặt'
        }}
      />
    </Tab.Navigator>
  );
}
