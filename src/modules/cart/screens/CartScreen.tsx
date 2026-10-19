import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';import React from 'react';
import { AppColors } from '../../../theme/colors';
import useCart from '../hooks/useCarts';
import { CartItem } from '../../home/types';
import CartItemCard from '../components/CartItemCard';


const CartScreen = () => {
  const { items, removeItem, totalPrice } = useCart();
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      {items.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>Giỏ hàng đang trống!</Text>
        </View>
      ) : (
        <>
          <FlatList<CartItem>
            data={items}
            keyExtractor={(item) => String(item.product.id)}
            // Gọn gàng chỉ với 1 dòng:
            renderItem={({ item }) => (
              <CartItemCard item={item} onRemove={removeItem} />
            )}
            contentContainerStyle={styles.list}
          />
          <View style={styles.footer}>
            <View>
              <Text style={styles.totalLabel}>Tổng tiền:</Text>
              <Text style={styles.totalValue}>${totalPrice}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => Alert.alert('Thông báo', 'Thanh toán thành công!')}
            >
              <Text style={styles.checkoutText}>Thanh toán</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
// const CartScreen = () => {
//   const {items, removeItem, totalPrice} = useCart();

//   return (
//     <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
//       {items.length === 0 ? (
//         <View style={styles.center}>
//         <Text style={styles.emptyText}>Giỏ hàng đang trống!</Text>
//         </View>
//       ) : (
//         <>
        
//         <FlatList<CartItem>
//             data={items}
//             keyExtractor={(item) => String(item.product.id)}
//             renderItem={({ item }) => (
//               <View style={styles.itemCard}>
//                 <View style={styles.itemInfo}>
//                   <Text style={styles.itemName}>{item.product.name}</Text>
//                   <Text style={styles.itemPrice}>
//                     ${item.product.price} x {item.quantity} = ${item.product.price * item.quantity}
//                   </Text>
//                 </View>
//                 <TouchableOpacity
//                   style={styles.deleteBtn}
//                   onPress={() => removeItem(item.product.id)}
//                 >
//                   <Text style={styles.deleteText}>Xoá</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//             contentContainerStyle={styles.list}
//           />
//           <View style={styles.footer}>
//             <View>
//               <Text style={styles.totalLabel}>Tổng tiền:</Text>
//               <Text style={styles.totalValue}>${totalPrice}</Text>
//             </View>
//             <TouchableOpacity
//               style={styles.checkoutBtn}
//               onPress={() => Alert.alert('Thanh toán thành công!')}
//             >
//               <Text style={styles.checkoutText}>Thanh toán</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//     </SafeAreaView>
//   );
// };

export default CartScreen;

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#94A3B8',
  },
  list: {
    padding: 16,
  },
  itemCard: {
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
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  itemPrice: {
    fontSize: 14,
    color: AppColors.primary,
    marginTop: 4,
    fontWeight: '600',
  },
  deleteBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FEE2E2',
    borderRadius: 6,
  },
  deleteText: {
    color: '#EF4444',
    fontWeight: '600',
  },
  footer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  checkoutBtn: {
    backgroundColor: AppColors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  checkoutText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});