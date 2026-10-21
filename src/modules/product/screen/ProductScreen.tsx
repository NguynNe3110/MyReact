import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColors } from '../../../theme/colors'
import { useProducts } from '../hooks/useProducts'
import { Product } from '../types'
import { ProductItem } from '../component/ProductItem'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ProductScreenNavigationProp, RootStackParamList } from '../../../navigation/types'
import { DetailProductScreen } from '../../detail-product-mock/DetailProductMockScreen'
import { RouteName } from '../../../config/navigation'

const ProductScreen = () => {

  const navigation = useNavigation<ProductScreenNavigationProp>();
  
  const {products, loading, error, refresh } = useProducts();

  const handleSelectProduct = (product : Product) => {
    //todo: điều hướng sang màn hình detail
    console.log("click ", product.id);
    navigation.navigate(RouteName.DetailProduct, {
      productId: product.id,
    });
  }

  if(loading && products.length === 0) {
    return (
      <View style = {styles.center}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }
  if(error && products.length === 0) {
    return (
      <View style = {styles.center}>
        <Text>PracticeScreen</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <ProductItem product={item} onPress={handleSelectProduct}/>
      )}
      refreshing={loading}
      onRefresh={refresh}
      contentContainerStyle={{ padding: 16}}
    />
  )


}

export default ProductScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
      },
      center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
      loadingText: {
        color: '#64748B',
      },
      list: {
        padding: 16,
      },
})