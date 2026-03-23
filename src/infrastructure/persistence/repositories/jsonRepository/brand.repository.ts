import brandsData from "../../data/brands.json"
import { Brand } from "../../../../domain/entities/brand.entity"
import { IBrandRepository } from "../../../../domain/repositories/brand.repository"
import { BrandMapper, BrandPrimitives } from "../../mappers/brand.mapper"

export class JsonBrandRepository implements IBrandRepository {
  private brands: BrandPrimitives[]

  constructor() {
    this.brands = brandsData as BrandPrimitives[]
  }

  async save(brand: Brand): Promise<Brand> {
    const index = this.brands.findIndex((b) => b.id === brand.getId())
    const primitive = BrandMapper.toPersistence(brand)

    if (index >= 0) {
      this.brands[index] = primitive
    } else {
      this.brands.push(primitive)
    }
    return brand
  }

  async findByPartnerId(partnerId: string): Promise<Brand[]> {
    return this.brands
      .filter((b) => b.partnerId === partnerId)
      .map(BrandMapper.toDomain)
  }

  async findById(id: string): Promise<Brand | null> {
    const found = this.brands.find((b) => b.id === id)
    return found ? BrandMapper.toDomain(found) : null
  }

}
