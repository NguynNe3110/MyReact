import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '../../../theme/colors';
import { User } from '../../user/types';
import UserItem from '../../user/UserItem';
import { useUsers } from '../../user/useUsers';

function HomeScreen() {
  const {users, loading, error, reload } = useUsers();

  return (
    <SafeAreaView 
        style = {styles.container}
        edges={['left', 'right', 'bottom']}
    >
        
        <Text
        >
          HomeScreen
        </Text>
    </SafeAreaView>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  list: {
    padding: 16,
    flexGrow: 1,
  },
  message: {
    fontSize: 16,
    color: AppColors.muted,
    textAlign: 'center',
  },
  errorBox: {
    padding: 16,
    gap: 12,
  },
  errorText: {
    fontSize: 16,
    color: AppColors.error,
  },
  button: {
    minHeight: 48,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
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