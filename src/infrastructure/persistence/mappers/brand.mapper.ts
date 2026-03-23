import { Brand } from "../../../domain/entities/brand.entity"
import { UniqueId } from "../../../domain/valueObjects/uniqueId.vo"

export interface BrandPrimitives {
  id: string
  name: string
  partnerId: string
  active: boolean
}

export class BrandMapper {
  static toDomain(data: BrandPrimitives): Brand {
    return new Brand(
      new UniqueId(data.id),
      data.name,
      new UniqueId(data.partnerId),
      data.active
    )
  }

  static toPersistence(brand: Brand): BrandPrimitives {
    return {
      id: brand.getId(),
      name: brand.getName(),
      partnerId: brand.getPartnerId(),
      active: brand.isActive()
    }
  }
}