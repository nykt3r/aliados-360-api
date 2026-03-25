import { describe, expect, it, vi } from "vitest";
import { GetPartnerById } from "../../../src/application/useCases/partners/getPartnerById.usecase";
import { IPartnerRepository } from "../../../src/domain/repositories/partner.repository";
import { Partner } from "../../../src/domain/entities/partner.entity";
import { UniqueId } from "../../../src/domain/valueObjects/uniqueId.vo";
import { PartnerNotFoundError } from "../../../src/domain/errors/partner.not.found.error";

describe("GetPartnerById Use Case", () => {
  it("should return a partner when it exists", async () => {
    const partner = new Partner(new UniqueId("partner-id"), "Ubuntu", true);
    const partnerRepository: IPartnerRepository = {
      save: vi.fn(),
      findById: vi.fn().mockResolvedValue(partner),
      findAll: vi.fn(),
      update: vi.fn(),
    };
    const getPartnerById = new GetPartnerById(partnerRepository);
    const request = { id: "partner-id" };

    const result = await getPartnerById.execute(request);

    expect(result).toBe(partner);
    expect(result.getName()).toBe("Ubuntu");
    expect(partnerRepository.findById).toHaveBeenCalledTimes(1);
    expect(partnerRepository.findById).toHaveBeenCalledWith("partner-id");
  });

  it("should throw PartnerNotFoundError when partner does not exist", async () => {
    const partnerRepository: IPartnerRepository = {
      save: vi.fn(),
      findById: vi.fn().mockResolvedValue(null),
      findAll: vi.fn(),
      update: vi.fn(),
    };
    const getPartnerById = new GetPartnerById(partnerRepository);
    const request = { id: "missing-id" };

    const act = () => getPartnerById.execute(request);

    await expect(act).rejects.toThrow(PartnerNotFoundError);
    expect(partnerRepository.findById).toHaveBeenCalledTimes(1);
    expect(partnerRepository.findById).toHaveBeenCalledWith("missing-id");
  });
});
