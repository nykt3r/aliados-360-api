import { Brand } from "../../entities/brand.entity";

export interface IBrandRepository {
  save(brand: Brand): Promise<Brand | void>;
  findByPartnerId(partnerId: string): Promise<Brand[]>;
  findById(id: string): Promise<Brand | null>;
}
