import { describe, expect, it, vi } from "vitest";
import { GetAllPartners } from "../../../src/application/useCases/partners/getAllPartner.usecase";
import { IPartnerRepository } from "../../../src/domain/repositories/partner.repository";
import { Partner } from "../../../src/domain/entities/partner.entity";
import { UniqueId } from "../../../src/domain/valueObjects/uniqueId.vo";

describe("GetAllPartners Use Case", () => {
  it("should return all partners", async () => {
    const partners = [
      new Partner(new UniqueId(), "Ubuntu", true),
      new Partner(new UniqueId(), "Canonical", false),
    ];
    const partnerRepository: IPartnerRepository = {
      save: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn().mockResolvedValue(partners),
      update: vi.fn(),
    };
    const getAllPartners = new GetAllPartners(partnerRepository);

    const result = await getAllPartners.execute();

    expect(result).toEqual(partners);
    expect(result).toHaveLength(2);
    expect(partnerRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("should return an empty array if there are no partners", async () => {
    const partnerRepository: IPartnerRepository = {
      save: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn().mockResolvedValue([]),
      update: vi.fn(),
    };
    const getAllPartners = new GetAllPartners(partnerRepository);

    const result = await getAllPartners.execute();

    expect(result).toEqual([]);
    expect(partnerRepository.findAll).toHaveBeenCalledTimes(1);
  });
});