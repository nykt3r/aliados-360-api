import productsData from "../../data/products.json"
import { Product } from "../../../../domain/entities/product.entity"
import { IProductRepository } from "../../../../domain/repositories/product.repository"
import { ProductMapper, ProductPrimitives } from "../../mappers/product.mapper"

export class JsonProductRepository implements IProductRepository {
  private products: ProductPrimitives[]

  constructor() {
    this.products = productsData as ProductPrimitives[]
  }

  async save(product: Product): Promise<Product> {
    const index = this.products.findIndex((p) => p.id === product.getId())
    const primitive = ProductMapper.toPersistence(product)

    if (index >= 0) {
      this.products[index] = primitive
    } else {
      this.products.push(primitive)
    }
    return product
  }

  async findByBrandId(brandId: string): Promise<Product[]> {
    return this.products
      .filter((p) => p.brandId === brandId)
      .map(ProductMapper.toDomain)
  }

  async findById(id: string): Promise<Product | null> {
    const found = this.products.find((p) => p.id === id)
    return found ? ProductMapper.toDomain(found) : null
  }

}
