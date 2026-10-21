import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../modules/home/screens/HomeScreen';
import SettingScreen from '../modules/setting/screens/SettingScreen';
import { AppColors } from '../theme/colors';
import { RouteName } from '../config/navigation';
import CartScreen from '../modules/cart/screens/CartScreen';
import { Pressable, Text } from 'react-native';
import { IcCart, IcPlaceHolder } from '../assets/icons';
import { HeaderCartButton } from '../modules/cart/components/HeaderCartButton';
import PracticeScreen from '../modules/product/screen/ProductScreen';

//hàm create sẽ trả về đói tượng gồm Navigator, Screen, Group
const Tab = createBottomTabNavigator<BottomTabParamList>();

// type mô tả danh sách màn hình và tham số của nó
export type BottomTabParamList = {
  // các route thuộc bottom tabs
  [RouteName.Home]: undefined; // underfined là k yêu cầu tham số
  [RouteName.Cart]: undefined; //setting là tên màn hình
  [RouteName.Product] : undefined;
  [RouteName.Setting]: undefined;
  // [RouteName.Fetch]: undefined;

  // khi dùng thì navigation.navigate('Home');
};

//trường hợp muốn nhận tham số
// export type BottomTabParamList = {
//   Home: { userId: number };
//   Setting: undefined;
// };

//khi truyền thì navigation.navigate('Home', {userId: 10});
function onPressIconCart(){
  console.log('Bấm icon')
}

export default function BottomTabNavigator() { // bản chât là component
  return (
    <Tab.Navigator
      initialRouteName={RouteName.Home} // xác định tab mặc định khi khởi tạo
      backBehavior="history" // lưu lịch sử tab để phục vụ thao tác quay lại.
      screenOptions={{ //để cấu hình mặc định cho các màn hinh thuộc navigator
        headerShown: true, // hiển thị hoặc ẩn header cho tất cả các tab
        tabBarActiveTintColor: AppColors.primary,
        tabBarInactiveTintColor: AppColors.muted,
        tabBarStyle: {
          backgroundColor: AppColors.surface,
          borderTopColor: AppColors.border,
          height: 60, 
          paddingBottom: 8, 
          paddingTop: 6
        },
      }}
    >
      <Tab.Screen
        name={RouteName.Home}
        component={HomeScreen}
        options={{
          title: 'Trang chủ',
          tabBarLabel: 'Trang chủ',
          // headerTitleAlign: 'center', // Căn giữa tiêu đề (mặc định Android căn trái, iOS căn giữa)
          headerStyle: {
            backgroundColor: '#ffffff', // Màu nền thanh header
            elevation: 0, // Bỏ bóng đổ trên Android
            shadowOpacity: 0, // Bỏ bóng đổ trên iOS
          },
          // headerTintColor: '#0f172a', // Màu chữ tiêu đề và icon back
          // headerTitleStyle: {
          //   fontWeight: '700',
          //   fontSize: 20,
          // },
          headerRight: () => (
            // Thêm icon/nút bên phải header (ví dụ icon thông báo hoặc giỏ hàng)
            // <Pressable onPress={onPressIconCart} style={{ marginRight: 16 }}>
            //   <IcCart
            //     width={24}
            //     height={24}
            //     color={AppColors.text}
            //     accessible={false}
            //   />
            // </Pressable>
            <HeaderCartButton/>
          ),

          tabBarIcon: ({color, size}) => (
            <IcPlaceHolder width={size} height={size} color={color}/>
          ),
        }}
      />

      {/* <Tab.Screen //có thể ghi đè một số cấu hình này cho từng Tab.Screen bằng options.
        name={RouteName.Cart} // tên route dùng trong navigate()
        component={CartScreen}
        options={{
          title: 'Giỏ hàng', // tiêu đề của màn hình (xuất hiện ở header)
          tabBarLabel: 'Giỏ hàng', // chữ hiển thị trên thanh tab
          tabBarIcon: ({color, size}) => (
            <IcPlaceHolder width={size} height={size} color={color}/>
          ),
        }}
      /> */}

      <Tab.Screen
        name={RouteName.Product} // tên phải giống tên đã khai báo trong BottomTabParamList
        component={PracticeScreen} 
        options={{
          title:'Sản phẩm',
          tabBarLabel: 'Sản phẩm',
          tabBarIcon: ({color, size}) => (
            <IcPlaceHolder width={size} height={size} color={color}/>
          ),
        }}
      />
      
      <Tab.Screen
        name={RouteName.Setting} // tên phải giống tên đã khai báo trong BottomTabParamList
        component={SettingScreen} 
        options={{
          title:'Cài đặt',
          tabBarLabel: 'Cài đặt',
          tabBarIcon: ({color, size}) => (
            <IcPlaceHolder width={size} height={size} color={color}/>
          ),
        }}
      />


    </Tab.Navigator>
  );
}
