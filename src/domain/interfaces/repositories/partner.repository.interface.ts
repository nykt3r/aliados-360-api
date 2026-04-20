import { Partner } from "../../entities/partner.entity";

export interface IPartnerRepository {
  save(partner: Partner): Promise<Partner | void>;
  findById(id: string): Promise<Partner | null>;
  findAll(): Promise<Partner[]>;
  update(partner: Partner): Promise<Partner | void>;
}