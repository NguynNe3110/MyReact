import { Pressable, StyleSheet, Text, View } from "react-native";
import { Product } from "../types";
import { AppColors } from "../../../theme/colors";


type ProductItemProps = {
    product: Product;
    onPress: (product: Product) => void
}

export default function ProductItem({product, onPress} : ProductItemProps) {
    return (
        <Pressable
            style= {({pressed}) => [styles.card, pressed && styles.pressed]}
            onPress={() => onPress(product)}
        >
            <View style={styles.content}>
                <Text style={styles.category}>{product.name}</Text>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price} > {product.price}</Text>

            </View>

            <View style = {styles.actionBtn}>
                <Text style = {styles.actionText}>Chi tiết</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pressed: {
    opacity: 0.7,
  },
  content: {
    flex: 1,
  },
  category: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: AppColors.primary,
  },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  actionText: {
    color: AppColors.primary,
    fontWeight: '600',
  },
})