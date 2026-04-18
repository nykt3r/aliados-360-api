import { Partner } from "../../../domain/entities/partner.entity";
import { IPartnerRepository } from "../../../domain/interfaces/repositories/partner.repository.interface";
import { UniqueId } from "../../../domain/valueObjects/uniqueId.vo";

interface CreatePartnerRequest {
  name: string;
}

export class CreatePartner {
  constructor(private partnerRepository: IPartnerRepository) {}

  async execute(request: CreatePartnerRequest): Promise<Partner> {
    const partner = new Partner(new UniqueId(), request.name);

    await this.partnerRepository.save(partner);
    return partner;
  }
}
