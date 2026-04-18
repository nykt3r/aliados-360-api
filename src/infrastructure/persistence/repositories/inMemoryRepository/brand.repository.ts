import { Brand } from "../../../../domain/entities/brand.entity";
import { IBrandRepository } from "../../../../domain/interfaces/repositories/brand.repository.interface";

export class InMemoryBrandRepository implements IBrandRepository {
  private brands: Brand[] = [];

  async save(brand: Brand): Promise<void> {
    this.brands.push(brand);
  }

  async findById(id: string): Promise<Brand | null> {
    const brand = this.brands.find((b) => b.getId() === id);
    return brand || null;
  }

  async findByPartnerId(partnerId: string): Promise<Brand[]> {
    return this.brands.filter((b) => b.getPartnerId() === partnerId);
  }
}
