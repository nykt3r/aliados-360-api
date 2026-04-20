import partnersData from "../../data/partners.json"
import { Partner } from "../../../../domain/entities/partner.entity"
import { IPartnerRepository } from "../../../../domain/interfaces/repositories/partner.repository.interface"
import { PartnerNotFoundError } from "../../../../domain/errors/partner/partner.not.found.error"
import { PartnerMapper, PartnerPrimitives } from "../../mappers/partner.mapper"

export class JsonPartnerRepository implements IPartnerRepository {
  private partners: PartnerPrimitives[]

  constructor() {
    this.partners = partnersData as PartnerPrimitives[]
  }

  async save(partner: Partner): Promise<Partner> {
    const index = this.partners.findIndex((p) => p.id === partner.getId())
    const primitive = PartnerMapper.toPersistence(partner)

    if (index >= 0) {
      this.partners[index] = primitive
    } else {
      this.partners.push(primitive)
    }
    return partner
  }

  async findById(id: string): Promise<Partner | null> {
    const found = this.partners.find((p) => p.id === id)
    if (found != null ) {
      return PartnerMapper.toDomain(found)
    }
    return null
  }

  async findAll(): Promise<Partner[]> {
    return this.partners.map(PartnerMapper.toDomain)
  }

  async update(partner: Partner): Promise<Partner> {
    const index = this.partners.findIndex((p) => p.id === partner.getId())

    if (index === -1) {
      throw new PartnerNotFoundError()
    }
    const primitive = PartnerMapper.toPersistence(partner)
    this.partners[index] = primitive
    return partner
  }
}
