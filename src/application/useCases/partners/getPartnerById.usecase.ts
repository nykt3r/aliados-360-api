import { Partner } from "../../../domain/entities/partner.entity";
import { PartnerNotFoundError } from "../../../domain/errors/partner/partner.not.found.error";
import { IPartnerRepository } from "../../../domain/interfaces/repositories/partner.repository.interface";
import { GetPartnerByIdDTO } from "../../dto/partners/getPartnerById.dto";

export class GetPartnerById {
  constructor(private partnerRepository: IPartnerRepository) {}

  async execute(request: GetPartnerByIdDTO): Promise<Partner> {
    const partner = await this.partnerRepository.findById(request.id);

    return this.ensurePartnerExists(partner, request.id);
  }

  private ensurePartnerExists(partner: Partner | null, _id: string): Partner {
    if (!partner) {
      throw new PartnerNotFoundError();
    }
    return partner;
  }
}