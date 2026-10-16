import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { User } from './types';
import { AppColors } from '../../theme/colors';

type UserItemProps = {
  user: User;
  onPress: (user: User) => void;
  onDelete: (user: User) => void;
};

function UserItem({ user, onPress, onDelete }: UserItemProps) {
  return (
    <View style={styles.card}>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Xem chi tiết ${user.name}`}
        onPress={() => onPress(user)}
        style={({ pressed }) => [
          styles.infoContainer,
          pressed && styles.pressed,
        ]}
      >

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.info}> {user.email} </Text>
      </Pressable>


      <Pressable 
        onPress={() => onDelete(user)}
        style = {({pressed}) => [
          styles.deleteButton, 
          pressed && styles.pressed
        ]}
      >

        <Text style={styles.deleteText}>Xóa</Text>
      </Pressable>

    </View>
  );
}

export default UserItem;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: AppColors.background,
  },

  card: {
    padding: 8,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AppColors.border,
    backgroundColor: AppColors.surface,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.text,
  },
  info: {
    fontSize: 16,
    color: AppColors.muted,
  },

  infoContainer: {
    flex: 1,
    minHeight: 48,
    justifyContent: 'center',
    gap: 8,
  },
  deleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
  },
  deleteText: {
    color: '#DC2626',
    fontWeight: '600',
  },
});
