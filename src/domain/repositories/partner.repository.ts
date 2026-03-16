import { Partner } from "../entities/partner.entity";

export interface IPartnerRepository {
  save(partner: Partner): Promise<void>;
  findById(id: string): Promise<Partner | null>;
  findAll(): Promise<Partner[]>;
  update(partner: Partner): Promise<void>;
}
