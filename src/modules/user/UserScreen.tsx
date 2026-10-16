import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '../../theme/colors';
import UserItem from './UserItem';
import { User } from './types';
import { useNavigation } from '@react-navigation/native';
import { UserScreenNavigationProp } from '../../navigation/types';
import { RouteName } from '../../config/navigation';
import { useUsers } from './useUsers';

function UserScreen() {
  const {users, loading, error, reload, removeUser } = useUsers();

  // có thể chuyển màn hình
    const navigation = useNavigation<UserScreenNavigationProp>();

    // handle remove user
    const handleDeleteUser = (selectdUser: User) => {
        Alert.alert(
            'Xác nhận xóa',
            `Bạn có chắc muốn xóa ${selectdUser.name}`,
            [
                {text: 'Hủy', style: 'cancel'},
                {text: 'Xóa', style: 'destructive', onPress: () => removeUser(selectdUser.id)},
            ]
        )
    }
  return (
    <SafeAreaView 
        style = {styles.container}
        edges={['left', 'right', 'bottom']}
    >
        
        {error && !loading && ( // re
            <View style = {styles.errorBox}>
                <Text style = {styles.errorText} 
                    accessibilityRole="alert" >
                    {error.message}
                </Text>

                <Pressable
                    onPress={reload}
                    accessibilityRole="button"
                    style = {({pressed}) => [
                        styles.button, 
                        pressed && styles.pressed, 
                    ]}
                >
                    <Text style = {styles.buttonText}>Thử lại</Text>
                </Pressable>
            </View>

        )}

        {loading && users.length === 0 ? (
            <View style= {styles.center}>
                <ActivityIndicator size={'large'}
                    color={AppColors.primary} />
                <Text style = {styles.message}>Đang tải...</Text>
            </View>

        ) : (
            <FlatList<User>
                data={users}
                keyExtractor={item => String(item.id)}
                renderItem = {({item}) => (
                    <UserItem 
                        user = {item}
                        onPress={(selectedUser) => {
                            navigation.navigate(RouteName.Detail, {
                                userId: selectedUser.id
                            });
                        }} 

                        onDelete={handleDeleteUser}
                    />
                )}
                contentContainerStyle = {styles.list}
                refreshing = {loading}
                onRefresh={reload}
                ListEmptyComponent={
                    error ? undefined : (
                        <Text style = {styles.message}>
                            Danh sách trống
                        </Text>
                    )
                }
            ></FlatList>
        )}
    </SafeAreaView>
  );
}

export default UserScreen

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