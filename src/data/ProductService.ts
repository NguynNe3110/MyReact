import { Product } from '../domain/product';

// Dữ liệu giả lập (Mock Data) tại tầng Data Source / Service
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    price: 34990000,
    description: 'Khung titan, chip A17 Pro cực mạnh mẽ, camera tiềm vọng 5x.',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    price: 31990000,
    description: 'Tích hợp Galaxy AI thông minh, bút S-Pen tiện lợi, camera 200MP.',
  },
  {
    id: '3',
    name: 'MacBook Air M3',
    price: 27990000,
    description: 'Thiết kế siêu mỏng nhẹ, pin 18 tiếng, hiệu năng vượt trội.',
  },
];

export class ProductService {
  /**
   * Giả lập gọi API lấy danh sách sản phẩm với độ trễ mạng 800ms
   */
  async fetchProducts(): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PRODUCTS);
      }, 800);
    });
  }

  /**
   * Giả lập gọi API tìm sản phẩm theo ID với độ trễ mạng 500ms
   */
  async fetchProductById(id: string): Promise<Product | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const found = MOCK_PRODUCTS.find((item) => item.id === id);
        resolve(found ?? null);
      }, 500);
    });
  }
}