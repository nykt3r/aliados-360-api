import { Partner } from "../../../../domain/entities/partner.entity";
import { IPartnerRepository } from "../../../../domain/interfaces/repositories/partner.repository.interface";
import { PartnerNotFoundError } from "../../../../domain/errors/partner/partner.not.found.error";

export class InMemoryPartnerRepository implements IPartnerRepository {
  private partners: Partner[] = [];

  async save(partner: Partner): Promise<Partner> {
    const index = this.partners.findIndex(
      (p) => p.getId() === partner.getId()
    );

    if (index >= 0) {
      this.partners[index] = partner;
    } else {
      this.partners.push(partner);
    }
    return partner;
  }

  async findById(id: string): Promise<Partner | null> {
    const partner = this.partners.find((p) => p.getId() === id);
    return partner || null;
  }

  async findAll(): Promise<Partner[]> {
    return [...this.partners];
  }

  async update(partner: Partner): Promise<Partner> {
    const index = this.partners.findIndex((p) => p.getId() === partner.getId())

    if (index === -1) {
      throw new PartnerNotFoundError();
    }

    this.partners[index] = partner;
    return partner;
  }

}
