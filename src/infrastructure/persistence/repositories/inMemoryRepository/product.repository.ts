import { Product } from "../../../../domain/entities/product.entity";
import { IProductRepository } from "../../../../domain/interfaces/repositories/product.repository.interface";

export class InMemoryProductRepository implements IProductRepository {
  private products: Product[] = [];

  async save(product: Product): Promise<void> {
    this.products.push(product);
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find((p) => p.getId() === id);
    return product || null;
  }

  async findByBrandId(brandId: string): Promise<Product[]> {
    return this.products.filter((p) => p.getBrandId() === brandId);
  }
}
