import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { User } from '../types';
import { AppColors } from '../../../theme/colors';

type UserItemProps = {
  user: User;
  onDelete: (user: User) => void;
};

function UserItem({ user, onDelete }: UserItemProps) {
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.info}> {user.email} </Text>
      </View>
      <Pressable style={styles.deleteButton} onPress={() => onDelete(user)}>
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
    gap: 8,
    flexDirection: 'column',
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
