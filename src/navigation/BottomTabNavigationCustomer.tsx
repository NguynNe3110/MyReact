import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../modules/home/screens/HomeScreen';
import CartScreen from '../modules/cart/screens/CartScreen';
import SettingScreen from '../modules/setting/screens/SettingScreen';

import { AppColors } from '../theme/colors';
import { RouteName } from '../config/navigation';
import { IcCart, IcHome, IcSetting } from '../assets/icons';
import { HeaderCartButton } from '../modules/cart/components/HeaderCartButton';
import { BottomTabParamList } from './BottomTabNavigator';

const Tab = createBottomTabNavigator<BottomTabParamList>();

/**
 * Component CustomTabBar tự vẽ hoàn toàn thanh Bottom Navigation
 * Nhận vào props chuẩn `BottomTabBarProps` từ React Navigation
 */
function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  // Lấy khoảng cách tai thỏ / phím điều hướng ảo dưới đáy màn hình
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.tabBarWrapper,
        {
          paddingBottom: Math.max(insets.bottom, 12),
        },
      ]}
    >
      <View style={styles.tabBarContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          // Lấy label từ options hoặc fallback về route.name
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          // Sự kiện khi người dùng click vào Tab
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const iconColor = isFocused ? AppColors.primary : AppColors.muted;

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.tabItem,
                isFocused && styles.tabItemActive, // style khi active
              ]}
            >
              {/* Render Icon từ options.tabBarIcon nếu có */}
              {options.tabBarIcon && (
                <View style={styles.iconContainer}>
                  {options.tabBarIcon({
                    focused: isFocused,
                    color: iconColor,
                    size: 22,
                  })}
                </View>
              )}

              {/* Render Text Label */}
              <Text
                style={[
                  styles.tabLabel,
                  { color: iconColor },
                  isFocused && styles.tabLabelActive,
                ]}
              >
                {typeof label === 'string' ? label : ''}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

/**
 * Bottom Tab Navigator sử dụng CustomTabBar
 */
export default function BottomTabNavigationCustomer() {
  return (
    <Tab.Navigator
      initialRouteName={RouteName.Home}
      backBehavior="history"
      // Sử dụng thuộc tính `tabBar` để ghi đè giao diện thanh Tab mặc định
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tab.Screen
        name={RouteName.Home}
        component={HomeScreen}
        options={{
          title: 'Trang chủ',
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <IcHome width={size} height={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: '#ffffff',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerRight: () => <HeaderCartButton />,
        }}
      />

      <Tab.Screen
        name={RouteName.Cart}
        component={CartScreen}
        options={{
          title: 'Giỏ hàng',
          tabBarLabel: 'Giỏ hàng',
          tabBarIcon: ({ color, size }) => (
            <IcCart width={size} height={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={RouteName.Setting}
        component={SettingScreen}
        options={{
          title: 'Cài đặt',
          tabBarLabel: 'Cài đặt',
          tabBarIcon: ({ color, size }) => (
            <IcSetting width={size} height={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
    pointerEvents: 'box-none',
  },
  tabBarContainer: {
    flexDirection: 'row',
    width: '92%',
    backgroundColor: AppColors.surface,
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    // Hiệu ứng bóng đổ nổi (Floating Tab Bar)
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 16,
  },
  tabItemActive: {
    backgroundColor: 'rgba(78, 194, 202, 0.12)', // Màu nền mờ nhẹ khi tab đang chọn
  },
  iconContainer: {
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  tabLabelActive: {
    fontWeight: '700',
  },
});
