import { Partner } from "../../../domain/entities/partner.entity"
import { UniqueId } from "../../../domain/valueObjects/uniqueId.vo"

export interface PartnerPrimitives {
  id: string
  name: string
  active: boolean
}

export class PartnerMapper {
  static toDomain(data: PartnerPrimitives): Partner {
    return new Partner(
      new UniqueId(data.id),
      data.name,
      data.active
    )
  }

  static toPersistence(partner: Partner): PartnerPrimitives {
    return {
      id: partner.getId(),
      name: partner.getName(),
      active: partner.isActive()
    }
  }
}