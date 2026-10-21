import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppColors } from '../../../theme/colors';
import { Product } from '../../product/types';
import { IcCart } from '../../../assets/icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Dữ liệu mẫu ban đầu để preview giao diện ngay trên thiết bị


export interface DetailProductScreenProps {
  product?: Product;
}

const DetailProductScreen: React.FC<DetailProductScreenProps> = ({
  product: productProp,
}) => {
  const insets = useSafeAreaInsets();


  const product = productProp || DEFAULT_PRODUCT;

  // 1. Danh sách ảnh
  const imageList = useMemo(() => {
    if (product.media?.images && product.media.images.length > 0) {
      return product.media.images;
    }
    if (product.media?.thumbnail) {
      return [product.media.thumbnail];
    }
    return ['https://via.placeholder.com/400x300'];
  }, [product.media]);

  // 2. Lấy danh sách màu sắc & kích cỡ từ variants
  const availableColors = useMemo(() => {
    const list = product.variants?.map((v) => v.options?.color).filter(Boolean) || [];
    return Array.from(new Set(list));
  }, [product.variants]);

  const availableSizes = useMemo(() => {
    const list = product.variants?.map((v) => v.options?.size).filter(Boolean) || [];
    return Array.from(new Set(list));
  }, [product.variants]);

  // 3. UI states cho tương tác người dùng
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(availableColors[0] || '');
  const [selectedSize, setSelectedSize] = useState(availableSizes[0] || '');
  const [quantity, setQuantity] = useState(1);

  // 4. Tìm mã SKU khớp với lựa chọn hiện tại
  const activeVariant = useMemo(() => {
    return (
      product.variants?.find(
        (v) =>
          (!selectedColor || v.options?.color === selectedColor) &&
          (!selectedSize || v.options?.size === selectedSize)
      ) || product.variants?.[0]
    );
  }, [product.variants, selectedColor, selectedSize]);

  // 5. Định dạng tiền tệ
  const formattedPrice = useMemo(() => {
    const amount = product.price?.amount || 0;
    return `${amount.toLocaleString('vi-VN')} ${product.price?.currency || 'VND'}`;
  }, [product.price]);

  const formattedTotal = useMemo(() => {
    const total = (product.price?.amount || 0) * quantity;
    return `${total.toLocaleString('vi-VN')} ${product.price?.currency || 'VND'}`;
  }, [product.price, quantity]);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* KHỐI 1: HÌNH ẢNH SẢN PHẨM & GALLERY */}
        <View style={styles.galleryCard}>
          <Image
            source={{ uri: imageList[selectedImgIndex] || imageList[0] }}
            style={styles.mainImage}
            resizeMode="cover"
          />

          {/* Badge danh mục */}
          {product.category?.name ? (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{product.category.name}</Text>
            </View>
          ) : null}

          {/* Badge tình trạng còn hàng / hết hàng */}
          <View
            style={[
              styles.stockBadge,
              product.inventory?.inStock ? styles.stockIn : styles.stockOut,
            ]}
          >
            <Text style={styles.stockBadgeText}>
              {product.inventory?.inStock ? 'Còn hàng' : 'Hết hàng'}
            </Text>
          </View>

          {/* Chỉ số ảnh (1/N) */}
          {imageList.length > 1 && (
            <View style={styles.pageIndicator}>
              <Text style={styles.pageIndicatorText}>
                {selectedImgIndex + 1} / {imageList.length}
              </Text>
            </View>
          )}

          {/* Dải thumbnail chọn nhanh ảnh */}
          {imageList.length > 1 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.thumbnailRow}
            >
              {imageList.map((uri, idx) => (
                <TouchableOpacity
                  key={`${uri}-${idx}`}
                  onPress={() => setSelectedImgIndex(idx)}
                  style={[
                    styles.thumbItem,
                    idx === selectedImgIndex && styles.thumbItemActive,
                  ]}
                  activeOpacity={0.8}
                >
                  <Image source={{ uri }} style={styles.thumbImg} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* KHỐI 2: THÔNG TIN TÊN, GIÁ & ĐÁNH GIÁ */}
        <View style={styles.card}>
          <Text style={styles.productName}>{product.name}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.productPrice}>{formattedPrice}</Text>
            {product.inventory?.quantity !== undefined && (
              <Text style={styles.stockQuantity}>
                Kho: {product.inventory.quantity}
              </Text>
            )}
          </View>

          <View style={styles.metaRow}>
            {product.rating ? (
              <View style={styles.ratingBox}>
                <Text style={styles.starIcon}>★</Text>
                <Text style={styles.ratingText}>
                  {product.rating.average.toFixed(1)}
                </Text>
                <Text style={styles.ratingCount}>
                  ({product.rating.count} đánh giá)
                </Text>
              </View>
            ) : null}

            {activeVariant?.sku ? (
              <View style={styles.skuBadge}>
                <Text style={styles.skuText}>SKU: {activeVariant.sku}</Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* KHỐI 3: LỰA CHỌN BIẾN THỂ (MÀU SẮC & KÍCH CỠ) */}
        {(availableColors.length > 0 || availableSizes.length > 0) && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tùy chọn sản phẩm</Text>

            {/* Màu sắc */}
            {availableColors.length > 0 && (
              <View style={styles.optionGroup}>
                <Text style={styles.optionLabel}>
                  Màu sắc: <Text style={styles.optionValue}>{selectedColor}</Text>
                </Text>
                <View style={styles.chipRow}>
                  {availableColors.map((color) => {
                    const isSelected = selectedColor === color;
                    return (
                      <TouchableOpacity
                        key={color}
                        onPress={() => setSelectedColor(color)}
                        style={[styles.chip, isSelected && styles.chipActive]}
                      >
                        <Text
                          style={[
                            styles.chipText,
                            isSelected && styles.chipTextActive,
                          ]}
                        >
                          {color}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* Kích cỡ */}
            {availableSizes.length > 0 && (
              <View style={styles.optionGroup}>
                <Text style={styles.optionLabel}>
                  Kích cỡ: <Text style={styles.optionValue}>{selectedSize}</Text>
                </Text>
                <View style={styles.chipRow}>
                  {availableSizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <TouchableOpacity
                        key={size}
                        onPress={() => setSelectedSize(size)}
                        style={[styles.chip, isSelected && styles.chipActive]}
                      >
                        <Text
                          style={[
                            styles.chipText,
                            isSelected && styles.chipTextActive,
                          ]}
                        >
                          {size}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}
          </View>
        )}

        {/* KHỐI 4: CHỌN SỐ LƯỢNG */}
        <View style={styles.card}>
          <View style={styles.quantityRow}>
            <View>
              <Text style={styles.cardTitle}>Số lượng</Text>
              <Text style={styles.quantityHint}>
                Tối đa {product.inventory?.quantity || 1} sản phẩm
              </Text>
            </View>

            <View style={styles.stepper}>
              <TouchableOpacity
                onPress={() => quantity > 1 && setQuantity((q) => q - 1)}
                style={[styles.stepBtn, quantity <= 1 && styles.stepBtnDisabled]}
                disabled={quantity <= 1}
              >
                <Text style={styles.stepBtnText}>-</Text>
              </TouchableOpacity>

              <View style={styles.stepValue}>
                <Text style={styles.stepValueText}>{quantity}</Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  quantity < (product.inventory?.quantity || 1) &&
                  setQuantity((q) => q + 1)
                }
                style={[
                  styles.stepBtn,
                  (!product.inventory?.inStock ||
                    quantity >= (product.inventory?.quantity || 1)) &&
                    styles.stepBtnDisabled,
                ]}
                disabled={
                  !product.inventory?.inStock ||
                  quantity >= (product.inventory?.quantity || 1)
                }
              >
                <Text style={styles.stepBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* KHỐI 5: THÔNG SỐ KỸ THUẬT (ATTRIBUTES) */}
        {product.attributes && Object.keys(product.attributes).length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Thông số kỹ thuật</Text>
            <View style={styles.table}>
              {product.attributes.brand ? (
                <View style={styles.tableRow}>
                  <Text style={styles.tableKey}>Thương hiệu</Text>
                  <Text style={styles.tableValue}>{product.attributes.brand}</Text>
                </View>
              ) : null}
              {product.attributes.warranty ? (
                <View style={styles.tableRow}>
                  <Text style={styles.tableKey}>Bảo hành</Text>
                  <Text style={styles.tableValue}>{product.attributes.warranty}</Text>
                </View>
              ) : null}
              {Object.entries(product.attributes).map(([key, value]) => {
                if (['brand', 'warranty'].includes(key)) return null;
                return (
                  <View key={key} style={styles.tableRow}>
                    <Text style={styles.tableKey}>{key}</Text>
                    <Text style={styles.tableValue}>{String(value)}</Text>
                  </View>
                );
              })}
              <View style={styles.tableRow}>
                <Text style={styles.tableKey}>Mã sản phẩm</Text>
                <Text style={styles.tableValue}>{product.id}</Text>
              </View>
            </View>
          </View>
        )}

        {/* KHỐI 6: MÔ TẢ SẢN PHẨM (DESCRIPTION) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mô tả sản phẩm</Text>
          <Text style={styles.descText}>
            {product.description ||
              'Chưa có thông tin mô tả chi tiết cho sản phẩm này.'}
          </Text>
        </View>

        {/* KHỐI 7: TỪ KHÓA (TAGS) */}
        {product.tags && product.tags.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Từ khóa nổi bật</Text>
            <View style={styles.tagsRow}>
              {product.tags.map((tag) => (
                <View key={tag} style={styles.tagPill}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* KHỐI 8: THANH ĐẶT HÀNG CỐ ĐỊNH PHÍA DƯỚI (STICKY BOTTOM BAR) */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Tổng thanh toán:</Text>
          <Text style={styles.totalAmount}>{formattedTotal}</Text>
        </View>

        <View style={styles.actionBtns}>
          <TouchableOpacity
            style={[
              styles.cartBtn,
              !product.inventory?.inStock && styles.btnDisabled,
            ]}
            disabled={!product.inventory?.inStock}
            activeOpacity={0.8}
          >
            <IcCart width={20} height={20} color={AppColors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.buyBtn,
              !product.inventory?.inStock && styles.btnDisabled,
            ]}
            disabled={!product.inventory?.inStock}
            activeOpacity={0.8}
          >
            <Text style={styles.buyBtnText}>
              {product.inventory?.inStock ? 'Mua ngay' : 'Hết hàng'}
            </Text>
          </TouchableOpacity>
        </View>
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
  scrollContent: {
    paddingBottom: 24,
  },

  // 1. Gallery
  galleryCard: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
    paddingBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
  },
  mainImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.85,
    backgroundColor: '#E2E8F0',
  },
  categoryBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(5, 150, 105, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  categoryBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  stockBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  stockIn: {
    backgroundColor: 'rgba(16, 185, 129, 0.9)',
  },
  stockOut: {
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
  },
  stockBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  pageIndicator: {
    position: 'absolute',
    bottom: 74,
    right: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pageIndicatorText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  thumbnailRow: {
    paddingHorizontal: 16,
    marginTop: 12,
    gap: 10,
  },
  thumbItem: {
    width: 56,
    height: 56,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  thumbItemActive: {
    borderColor: AppColors.primary,
  },
  thumbImg: {
    width: '100%',
    height: '100%',
  },

  // Cards chung
  card: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },

  // 2. Info
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    lineHeight: 28,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: AppColors.primary,
  },
  stockQuantity: {
    fontSize: 13,
    color: AppColors.muted,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    color: '#F59E0B',
    fontSize: 16,
    marginRight: 4,
  },
  ratingText: {
    fontWeight: '700',
    color: '#0F172A',
    marginRight: 4,
  },
  ratingCount: {
    color: AppColors.muted,
    fontSize: 13,
  },
  skuBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  skuText: {
    fontSize: 12,
    color: AppColors.muted,
    fontWeight: '600',
  },

  // 3. Variants
  optionGroup: {
    marginBottom: 12,
  },
  optionLabel: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '600',
    marginBottom: 8,
  },
  optionValue: {
    color: AppColors.primary,
    fontWeight: '700',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  chipActive: {
    borderColor: AppColors.primary,
    backgroundColor: '#ECFDF5',
  },
  chipText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },
  chipTextActive: {
    color: AppColors.primary,
    fontWeight: '700',
  },

  // 4. Stepper
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityHint: {
    fontSize: 12,
    color: AppColors.muted,
    marginTop: 2,
  },
  stepper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    overflow: 'hidden',
  },
  stepBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  stepBtnDisabled: {
    opacity: 0.4,
  },
  stepBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  stepValue: {
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#CBD5E1',
  },
  stepValueText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },

  // 5. Attributes Table
  table: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tableKey: {
    width: 120,
    fontSize: 13,
    color: '#64748B',
    textTransform: 'capitalize',
  },
  tableValue: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '600',
  },

  // 6. Description
  descText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
  },

  // 7. Tags
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  tagText: {
    color: AppColors.primary,
    fontSize: 12,
    fontWeight: '600',
  },

  // 8. Bottom bar
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 6,
  },
  priceContainer: {
    flex: 1,
    marginRight: 10,
  },
  priceLabel: {
    fontSize: 11,
    color: AppColors.muted,
    textTransform: 'uppercase',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: AppColors.primary,
    marginTop: 2,
  },
  actionBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cartBtn: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#ECFDF5',
    borderWidth: 1.5,
    borderColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyBtn: {
    backgroundColor: AppColors.primary,
    paddingHorizontal: 20,
    height: 46,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 110,
  },
  buyBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  btnDisabled: {
    backgroundColor: '#CBD5E1',
    borderColor: '#CBD5E1',
  },
});
