import { IPartnerRepository } from "../../../domain/interfaces/repositories/partner.repository.interface";
import { PartnerNotFoundError } from "../../../domain/errors/partner/partner.not.found.error";
import { UpdatePartnerDTO } from "../../../../src/application/dto/partners/updatePartner.dto";
import { Partner } from "../../../domain/entities/partner.entity";
import { UniqueId } from "../../../domain/valueObjects/uniqueId.vo";
import { BadRequestError } from "../../../shared/errors/app.error";

export class UpdatePartner {
  constructor(private partnerRepository: IPartnerRepository) {}

  async execute(request: UpdatePartnerDTO): Promise<Partner> {
    const partner = await this.findPartnerOrFail(request.id);

    this.validateRequest(request);
    const updatedPartner = this.buildUpdatedPartner(partner, request);
    await this.partnerRepository.update(updatedPartner);
    return updatedPartner;
  }

  private async findPartnerOrFail(id: string): Promise<Partner> {
    const partner = await this.partnerRepository.findById(id);

    if (!partner) {
      throw new PartnerNotFoundError();
    }

    return partner;
  }

  private validateRequest(request: UpdatePartnerDTO): void {
    if (request.name === undefined && request.active === undefined) {
      throw new BadRequestError("At least one field must be provided to update");
    }

    if (request.name !== undefined) {
      this.validateName(request.name);
    }

    if (request.active !== undefined) {
      this.validateActive(request.active);
    }
  }

  private validateName(name: string): void {
    if (typeof name !== "string") {
      throw new BadRequestError("Name must be a string");
    }

    const trimmed = name.trim();

    if (!trimmed) {
      throw new BadRequestError("Name cannot be empty");
    }

    if (trimmed.length < 3) {
      throw new BadRequestError("Name must be at least 3 characters");
    }
  }

  private validateActive(active: boolean): void {
    if (typeof active !== "boolean") {
      throw new BadRequestError("Active must be a boolean");
    }
  }

  private buildUpdatedPartner(existing: Partner,request: UpdatePartnerDTO): Partner {
    return new Partner(
      new UniqueId(existing.getId()),
      request.name ?? existing.getName(),
      request.active ?? existing.isActive()
    );
  }

}
