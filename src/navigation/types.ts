import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  Route,
  RouteProp,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteName } from '../config/navigation';
import type { Profile } from '../modules/user/types';
import { AuthStackParamList } from './AuthNavigator';
import { BottomTabParamList } from './BottomTabNavigator';


// khai báo toàn app
export type RootStackParamList = {
  // cách route thuộc stack gốc
  // khai báo thanh bottom nav. khi này có thể chỉ định màn hình con trong navigator này
  [RouteName.BottomBarStack]:
    | NavigatorScreenParams<BottomTabParamList>
    | undefined; // cái underfined này cho phép có thể k cần truyền tham số
  //vd: navigation.navigate('BottomBarStack', {
  //  screen: 'Settting'
  //})

  [RouteName.Auth] : 
    | NavigatorScreenParams<AuthStackParamList>
    | undefined;

  [RouteName.DetailUser]: { userId: number }; // yêu cầu tryền tham số, khi gọi đến nó,
  //   navigation.navigate('Detail',{
  //     userId: 1,
  //   })

  [RouteName.InfoSelf]: { profile: Profile };

  [RouteName.UserScreen] : undefined;

  [RouteName.DetailProduct] : {productId: number};

  [RouteName.Login]: undefined;
  [RouteName.Register]: undefined;
  [RouteName.ForgotPassword]: undefined;
};

// home có thể chuyển tab và mở màn trong stack cha
export type HomeScreenNavigationProp = CompositeNavigationProp<
  //CompositeNavigationProp kết hợp 2 kiểu Prop khác nhau
  BottomTabNavigationProp<BottomTabParamList, RouteName.Home>, // prop dùng trong bottom nav
  NativeStackNavigationProp<RootStackParamList> // prop dùng để khai báo cho các màn hình khác trong rootStack biết
>;

// prac cũng có thể chuyển tab và mở detail vì cùng cấp trong rootStackParamList
export type CartScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, RouteName.Cart>,
  NativeStackNavigationProp<RootStackParamList>
>;

export type SettingScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, RouteName.Setting>,
  NativeStackNavigationProp<RootStackParamList>
>;

// định kiểu cho đối tượng navigation của Detail (giúp định danh màn hình Detail cho các màn hình khác navigate)
export type DetailUserScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  RouteName.DetailUser
>;

// dùng để định kiểu cho đối tượng route của Detail. (định nghĩa các tham số truyền vào)
// khi có screen gọi đến detail nó truyền param và Detail nhận lại bằng useRoute()
export type DetailUserScreenRouteProp = RouteProp<
  RootStackParamList,
  RouteName.DetailUser
>;

export type InfoSelfScreenRouteProp = RouteProp<
  RootStackParamList,
  RouteName.InfoSelf
>;

export type UserScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  RouteName.UserScreen
>;

export type DetailProductScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList, 
  RouteName.DetailProduct
>;

export type DetailProductScreenProp = RouteProp<
  RootStackParamList,
  RouteName.DetailProduct
>;

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  RouteName.Login
>;

export type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  RouteName.Register
>;