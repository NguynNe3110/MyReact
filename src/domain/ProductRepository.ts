import { Product } from './product';

export interface ProductRepository {

  getProducts(): Promise<Product[]>;

  getProductById(id: string): Promise<Product | null>;
}
