import { Partner } from "../../../domain/entities/partner.entity";
import { IPartnerRepository } from "../../../domain/interfaces/repositories/partner.repository.interface";

export class GetAllPartners {
  constructor(private partnerRepository: IPartnerRepository) {}

  async execute(): Promise<Partner[]> {
    return this.partnerRepository.findAll();
  }
}