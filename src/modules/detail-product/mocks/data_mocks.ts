import { Product } from '../../product/types';

export const DEFAULT_PRODUCT: Product = {
  id: 'prd_001',
  name: 'Tai nghe Bluetooth Wireless SoundPro Bass Extra',
  description:
    'Tai nghe chụp tai Bluetooth mang đến âm thanh sống động với âm trầm mạnh mẽ, công nghệ chống ồn chủ động (ANC) vượt trội và thời lượng pin ấn tượng lên đến 30 giờ.',
  price: {
    amount: 1250000,
    currency: 'VND',
  },
  category: {
    id: 'cat_electronics',
    name: 'Thiết bị âm thanh',
    slug: 'electronics',
  },
  inventory: {
    quantity: 25,
    inStock: true,
  },
  media: {
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    ],
  },
  attributes: {
    brand: 'SoundMaster',
    warranty: '12 tháng chính hãng',
  },
  variants: [
    {
      sku: 'SM-BLACK-M',
      options: {
        color: 'Đen nhám',
        size: 'M',
      },
    },
    {
      sku: 'SM-WHITE-M',
      options: {
        color: 'Trắng sứ',
        size: 'M',
      },
    },
  ],
  rating: {
    average: 4.8,
    count: 128,
  },
  tags: ['bluetooth', 'tainghe', 'amthanh'],
  createdAt: '2026-10-20T07:34:11.211Z',
  updatedAt: '2026-10-21T07:34:11.211Z',
};
