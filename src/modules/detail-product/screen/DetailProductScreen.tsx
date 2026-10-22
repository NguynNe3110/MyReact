import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  DetailProductScreenNavigationProp,
  DetailProductScreenProp,
} from '../../../navigation/types';
import { useDetailProduct } from '../hooks/useDetailProduct';
import { AppColors } from '../../../theme/colors';

const DetailProductScreen = () => {
  const navigation = useNavigation<DetailProductScreenNavigationProp>();
  const route = useRoute<DetailProductScreenProp>();

  // 1. Lấy productId an toàn bằng optional chaining (tránh crash nếu params bị undefined)
  const productId = route.params?.productId;

  // 2. Dùng hook lấy dữ liệu từ API
  const { product, loading, error } = useDetailProduct(productId);

  // 3. Trạng thái đang tải dữ liệu
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={AppColors.primary} />
        <Text style={styles.loadingText}>Đang tải chi tiết sản phẩm...</Text>
      </View>
    );
  }

  // 4. Trạng thái lỗi hoặc không có dữ liệu
  if (error || !product) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          {error || 'Không tìm thấy thông tin sản phẩm!'}
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Quay lại danh sách</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 5. Chuẩn bị ảnh hiển thị an toàn
  const imageUri =
    product.media?.thumbnail ||
    (Array.isArray(product.media?.images) && product.media.images[0]) ||
    'https://via.placeholder.com/300';

  // Định dạng giá tiền an toàn (hỗ trợ cả dạng object {amount, currency} lẫn dạng số)
  const formattedPrice =
    product.price?.amount != null
      ? `${product.price.amount.toLocaleString()} ${product.price.currency || 'VND'}`
      : typeof product.price === 'number'
      ? `${Number(product.price).toLocaleString()} VND`
      : 'Liên hệ';

  const handleAddToCart = () => {
    Alert.alert('Thành công', `Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Ảnh sản phẩm */}
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Khối thông tin chi tiết */}
        <View style={styles.card}>
          {/* Badge danh mục & Tình trạng kho */}
          <View style={styles.badgeRow}>
            {product.category?.name ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{product.category.name}</Text>
              </View>
            ) : null}

            <View
              style={[
                styles.badge,
                product.inventory?.inStock
                  ? styles.badgeInStock
                  : styles.badgeOutOfStock,
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  product.inventory?.inStock
                    ? styles.badgeInStockText
                    : styles.badgeOutOfStockText,
                ]}
              >
                {product.inventory?.inStock
                  ? `Còn hàng (${product.inventory?.quantity ?? 0})`
                  : 'Hết hàng'}
              </Text>
            </View>
          </View>

          {/* Tên & Giá sản phẩm */}
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{formattedPrice}</Text>

          {/* Đánh giá sao (kiểm tra an toàn tránh toFixed trên undefined) */}
          {product.rating?.average != null ? (
            <View style={styles.ratingRow}>
              <Text style={styles.star}>
                ★ {Number(product.rating.average).toFixed(1)}
              </Text>
              <Text style={styles.ratingCount}>
                ({product.rating.count ?? 0} đánh giá)
              </Text>
            </View>
          ) : null}

          <View style={styles.divider} />

          {/* Tùy chọn Biến thể (Variants) nếu có */}
          {Array.isArray(product.variants) && product.variants.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Các phiên bản có sẵn:</Text>
              <View style={styles.chipRow}>
                {product.variants.map((v, index) => (
                  <View key={v?.sku || index} style={styles.chip}>
                    <Text style={styles.chipText}>
                      {v?.options?.color} {v?.options?.size ? `- Size ${v.options.size}` : ''}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Thông số kỹ thuật (Attributes) nếu có */}
          {product.attributes && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Thông số kỹ thuật:</Text>
              {product.attributes.brand ? (
                <Text style={styles.specItem}>
                  • Thương hiệu: <Text style={styles.specBold}>{product.attributes.brand}</Text>
                </Text>
              ) : null}
              {product.attributes.warranty ? (
                <Text style={styles.specItem}>
                  • Bảo hành: <Text style={styles.specBold}>{product.attributes.warranty}</Text>
                </Text>
              ) : null}
            </View>
          )}

          {/* Mô tả sản phẩm */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mô tả sản phẩm:</Text>
            <Text style={styles.desc}>
              {product.description || 'Chưa có thông tin mô tả cho sản phẩm này.'}
            </Text>
          </View>

          {/* Từ khóa (Tags) nếu có */}
          {Array.isArray(product.tags) && product.tags.length > 0 && (
            <View style={styles.tagRow}>
              {product.tags.map((tag) => (
                <Text key={tag} style={styles.tagText}>
                  #{tag}
                </Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Nút bấm Thêm vào giỏ hàng dưới chân màn hình */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.btn,
            !product.inventory?.inStock && styles.btnDisabled,
          ]}
          disabled={!product.inventory?.inStock}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>
            {product.inventory?.inStock ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#64748B',
    fontSize: 14,
  },
  errorText: {
    color: AppColors.error,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: AppColors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  image: {
    width: '100%',
    height: 280,
    backgroundColor: '#E2E8F0',
  },
  card: {
    backgroundColor: '#FFF',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: AppColors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  badgeInStock: {
    backgroundColor: '#E0F2FE',
  },
  badgeInStockText: {
    color: '#0284C7',
  },
  badgeOutOfStock: {
    backgroundColor: '#FEE2E2',
  },
  badgeOutOfStockText: {
    color: '#EF4444',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    color: AppColors.primary,
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  star: {
    color: '#F59E0B',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 6,
  },
  ratingCount: {
    color: '#64748B',
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 14,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  chipText: {
    fontSize: 13,
    color: '#475569',
  },
  specItem: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 4,
  },
  specBold: {
    fontWeight: '600',
    color: '#0F172A',
  },
  desc: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  tagText: {
    fontSize: 12,
    color: AppColors.primary,
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  btn: {
    backgroundColor: AppColors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnDisabled: {
    backgroundColor: '#CBD5E1',
  },
  btnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
