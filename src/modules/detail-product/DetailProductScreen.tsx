import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppColors } from '../../theme/colors'
import { Route, useNavigation, useRoute } from '@react-navigation/native'
import { DetailProductScreenNavigationProp, DetailProductScreenProp } from '../../navigation/types'
import { Product } from '../home/types'
import { getProductById } from '../home/api/productApi'
import { cartStorage } from '../cart/storage/cartStorage'

const DetailProductScreen = () => {
  const route = useRoute<DetailProductScreenProp>(); // phari duoc khoi tao
  const navigation = useNavigation<DetailProductScreenNavigationProp>();

  const {productId} = route.params; // chi nhan khong can phai khai baso

  const[product, setProduct] = useState<Product | null>(null);
  const[loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    async function fetchDetail() {
      setLoading(true);
      const data = await getProductById(productId);

      setProduct(data ?? null);
      setLoading(false);
    }

    fetchDetail();

  }, [productId]);

  const handleAddToCart = async () => {
    if(!product) return;
    await cartStorage.addToCart(product);
    Alert.alert('Thành công', `Đã thêm "${product.name}" vào giỏ hàng`);
  };

  if(!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found!</Text>
      </View>
    );
  }

  return (
    <View style = {styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <View style={styles.divider} />
        <Text style={styles.descTitle}>Mô tả sản phẩm:</Text>
        <Text style={styles.desc}>{product.desctiption}</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleAddToCart}>
        <Text style={styles.btnText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

export default DetailProductScreen

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
    justifyContent: 'space-between',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    elevation: 3,
  },
  badge: {
    color: AppColors.primary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: '800',
    color: AppColors.primary,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginBottom: 16,
  },
  descTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  desc: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
  },
  btn: {
    backgroundColor: AppColors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
})