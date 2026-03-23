import { IPartnerRepository } from "../../../domain/repositories/partner.repository";
import { PartnerNotFoundError } from "../../../domain/errors/partner.not.found.error";
import { UpdatePartnerDTO } from "../../dto/partners/updatePartner.dto";
import { Partner } from "../../../domain/entities/partner.entity";

export class UpdatePartner {
  constructor(private partnerRepository: IPartnerRepository) {}

  async execute(request: UpdatePartnerDTO): Promise<void> {
    const partner = await this.partnerRepository.findById(request.id);

    if (!partner) {
      throw new PartnerNotFoundError();
    }

    if (request.name !== undefined) {
      if (!request.name.trim()) {
        throw new Error("Name cannot be empty");
      }
      (partner as any).name = request.name; 
    }

    if (request.active !== undefined) {
      request.active ? partner.activate() : partner.deactivate();
    }

    await this.partnerRepository.update(partner);
  }
}