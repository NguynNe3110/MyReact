import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '../../../theme/colors';
import { User } from '../../user/types';
import UserItem from '../../user/component/UserItem';
import { useUsers } from '../../user/useUsers';
import { useProductsMock } from '../hooks/useProductsMock';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../../../navigation/types';
import { ProductMock } from '../types';
import { RouteName } from '../../../config/navigation';
import ProductItemMock from '../components/ProductItemMock';
import App from '../../../../App';
import { Snackbar } from '../../../components/Snackbar';

function HomeScreen() {
  const {products, loading, reload} = useProductsMock();
  const [snackBarMessage, setSnackBarMessage] = useState<string | null>(null);
  
  const navigation = useNavigation<HomeScreenNavigationProp>();

  function handlePressProduct(product: ProductMock) {
    navigation.navigate(RouteName.DetailProduct, {
      productId: product.id,
    });
  }

  async function handlePullToRefresh() {
    await reload(); // phải chờ gọi API lấy danh sách mới xong
    setSnackBarMessage('Làm mới thành công!'); // display
  }

  return (
    <SafeAreaView 
        style = {styles.container}
        edges={['left', 'right', 'bottom']}
    >
      {loading ? (
        <View style = {styles.center}>
        <ActivityIndicator size="large" color={AppColors.primary}/>
        <Text style={styles.loadingText}>Đang tải danh sách sản phẩm...</Text>
      </View>
      ) : (
        <FlatList<ProductMock>
          data = {products}
          keyExtractor={(item) => String(item.id)} // co ve nhu la key dinh danh
          renderItem={({item}) => ( // ve tung item tu products
            <ProductItemMock 
              product={item} 
              onPress={handlePressProduct}/>
          )}
          contentContainerStyle={styles.list}
          refreshing={loading}
          onRefresh={handlePullToRefresh} // pull to refresh 
        />
      )}, 

      <Snackbar
        message={snackBarMessage}
        onDismiss={() => setSnackBarMessage(null)}
      />
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
  loadingText: {
    color: '#64748B',
  },
  list: {
    padding: 16,
  },
});