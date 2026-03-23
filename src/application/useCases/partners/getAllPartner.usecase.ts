import { Partner } from "../../../domain/entities/partner.entity";
import { IPartnerRepository } from "../../../domain/repositories/partner.repository";

export class GetAllPartners {
  constructor(private partnerRepository: IPartnerRepository) {}

  async execute(): Promise<Partner[]> {
    return this.partnerRepository.findAll();
  }
}