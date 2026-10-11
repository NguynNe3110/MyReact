import { Product } from '../domain/product';
import { ProductRepository } from '../domain/ProductRepository';
import { ProductService } from './ProductService';

export class ProductRepositoryImpl implements ProductRepository {

  // constructor(
  //   private productService: ProductService = new ProductService(),
  // ){}

  private productService : ProductService;

  constructor(
    productService: ProductService = new ProductService()
  ){
    this.productService = productService
  }


  async getProducts(): Promise<Product[]> {
    return this.productService.fetchProducts();
  }


// có thể bỏ async vì chỉ chuyển tiếp tới Service
  getProductById(id: string): Promise<Product | null> {
    return this.productService.fetchProductById(id);
  }
}
