import { Product } from "../../entities/product.entity";

export interface IProductRepository {
  save(product: Product): Promise<Product | void>;
  findByBrandId(brandId: string): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
}
