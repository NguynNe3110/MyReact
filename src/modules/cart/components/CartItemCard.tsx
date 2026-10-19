// src/modules/cart/components/CartItem.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CartItem as CartItemType } from '../../home/types';
import { AppColors } from '../../../theme/colors';

type CartItemProps = {
  item: CartItemType;
  onRemove: (productId: number) => void;
};

export default function CartItemCard({ item, onRemove }: CartItemProps) {
  const itemTotal = item.product.price * item.quantity;

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.product.name}</Text>
        <Text style={styles.priceDetail}>
          ${item.product.price} x {item.quantity} ={' '}
          <Text style={styles.totalPrice}>${itemTotal}</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => onRemove(item.product.id)}
      >
        <Text style={styles.deleteText}>Xoá</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  priceDetail: {
    fontSize: 14,
    color: '#64748B',
  },
  totalPrice: {
    fontWeight: '700',
    color: AppColors.primary,
  },
  deleteBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
  },
  deleteText: {
    color: '#EF4444',
    fontWeight: '600',
  },
});
