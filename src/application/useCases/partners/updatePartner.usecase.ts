import { IPartnerRepository } from "../../../domain/repositories/partner.repository";
import { PartnerNotFoundError } from "../../../domain/errors/partner.not.found.error";
import { UpdatePartnerDTO } from "../../../../src/application/dto/partners/updatePartner.dto";
import { Partner } from "../../../domain/entities/partner.entity";
import { UniqueId } from "../../../domain/valueObjects/uniqueId.vo";

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
      throw new Error("At least one field must be provided to update");
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
      throw new Error("Name must be a string");
    }

    const trimmed = name.trim();

    if (!trimmed) {
      throw new Error("Name cannot be empty");
    }

    if (trimmed.length < 3) {
      throw new Error("Name must be at least 3 characters");
    }
  }

  private validateActive(active: boolean): void {
    if (typeof active !== "boolean") {
      throw new Error("Active must be a boolean");
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
