import { describe, expect, it, vi } from "vitest";
import { CreatePartner } from "../../../src/application/useCases/partners/createPartner.usecase";
import { IPartnerRepository } from "../../../src/domain/repositories/partner.repository";
import { InvalidPartnerNameError } from "../../../src/domain/errors/invalid.partner.name.error";

describe("CreatePartner Use Case", () => {
  it("should create and save a partner", async () => {
    const partnerRepository: IPartnerRepository = {
      save: vi.fn().mockImplementation(async (partner) => partner),
      findById: vi.fn(),
      findAll: vi.fn(),
      update: vi.fn(),
    };
    const createPartner = new CreatePartner(partnerRepository);
    const request = { name: "Ubuntu" };

    const result = await createPartner.execute(request);

    expect(result).toBeDefined();
    expect(result.getName()).toBe("Ubuntu");
    expect(result.isActive()).toBe(true);
    expect(partnerRepository.save).toHaveBeenCalledTimes(1);
    expect(partnerRepository.save).toHaveBeenCalledWith(result);
  });

  it("should throw InvalidPartnerNameError if name is empty", async () => {
    const partnerRepository: IPartnerRepository = {
      save: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      update: vi.fn(),
    };
    const createPartner = new CreatePartner(partnerRepository);
    const request = { name: "" };

    const act = () => createPartner.execute(request);

    await expect(act).rejects.toThrow(InvalidPartnerNameError);
    expect(partnerRepository.save).not.toHaveBeenCalled();
  });

  it("should throw InvalidPartnerNameError if name has only spaces", async () => {
    const partnerRepository: IPartnerRepository = {
      save: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      update: vi.fn(),
    };
    const createPartner = new CreatePartner(partnerRepository);
    const request = { name: "   " };

    const act = () => createPartner.execute(request);

    await expect(act).rejects.toThrow(InvalidPartnerNameError);
    expect(partnerRepository.save).not.toHaveBeenCalled();
  });
});