import { Partner } from "../../domain/entities/partner.entity";
import { IPartnerRepository } from "../../domain/repositories/partner.repository";
import { PartnerNotFoundError } from "../../domain/errors/partner.not.found.error";

export class InMemoryPartnerRepository implements IPartnerRepository {
  private partners: Partner[] = [];

  async save(partner: Partner): Promise<void> {
    this.partners.push(partner);
  }

  async findById(id: string): Promise<Partner | null> {
    const partner = this.partners.find((p) => p.getId() === id);
    return partner || null;
  }

  async findAll(): Promise<Partner[]> {
    return [...this.partners];
  }

  async update(partner: Partner): Promise<void> {
    const index = this.partners.findIndex((p) => p.getId() === partner.getId());

    if (index === -1) {
      throw new PartnerNotFoundError();
    }

    this.partners[index] = partner;
  }
}
