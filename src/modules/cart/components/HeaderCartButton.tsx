import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteName } from '../../../config/navigation';
import { BottomTabParamList } from '../../../navigation/BottomTabNavigator';
import { IcCart } from '../../../assets/icons';
import { AppColors } from '../../../theme/colors';

export const HeaderCartButton = () => {
  // Dùng hook lấy navigation trực tiếp ngay trong component
  const navigation = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

  const handlePressCart = () => {
    navigation.navigate(RouteName.Cart);
  };

  return (
    <Pressable onPress={handlePressCart} style={styles.container}>
      <IcCart
        width={24}
        height={24}
        color={AppColors.text}
        accessible={false}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    padding: 4,
  },
});
