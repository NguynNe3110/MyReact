// src/modules/product/components/ProductItem.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Product } from '../types';

interface ProductItemProps {
  product: Product;
  onPress: (product: Product) => void;
}

// export const ProductItems = ({product, onPress} : ProductItemProps) => { // hafm mũi tên
export function ProductItem({product, onPress} : ProductItemProps){
  const thumbnailUri = product.media?.thumbnail || 'https://via.placeholder.com/150';

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(product)}>
      <Image source={{ uri: thumbnailUri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.price}>
          {product.price.amount.toLocaleString()} {product.price.currency}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 12, backgroundColor: '#fff', borderRadius: 8, marginBottom: 10 },
  image: { width: 80, height: 80, borderRadius: 6, backgroundColor: '#eee' },
  info: { marginLeft: 12, flex: 1, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: '600' },
  price: { fontSize: 15, color: '#E11D48', marginTop: 4, fontWeight: 'bold' },
});
