import { Product } from "../../../domain/entities/product.entity"
import { UniqueId } from "../../../domain/valueObjects/uniqueId.vo"

export interface ProductPrimitives {
  id: string
  name: string
  brandId: string
  active: boolean
}

export class ProductMapper {
  static toDomain(data: ProductPrimitives): Product {
    return new Product(
      new UniqueId(data.id),
      data.name,
      new UniqueId(data.brandId),
      data.active
    )
  }

  static toPersistence(product: Product): ProductPrimitives {
    return {
      id: product.getId(),
      name: product.getName(),
      brandId: product.getBrandId(),
      active: product.isActive()
    }
  }
}