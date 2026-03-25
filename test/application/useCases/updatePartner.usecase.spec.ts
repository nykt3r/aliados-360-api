import { describe, expect, it, vi } from "vitest";
import { UpdatePartner } from "../../../src/application/useCases/partners/updatePartner.usecase";
import { IPartnerRepository } from "../../../src/domain/repositories/partner.repository";
import { Partner } from "../../../src/domain/entities/partner.entity";
import { UniqueId } from "../../../src/domain/valueObjects/uniqueId.vo";
import { PartnerNotFoundError } from "../../../src/domain/errors/partner.not.found.error";

describe("UpdatePartner Use Case", () => {
  it("should update the partner name", async () => {
    const partner = new Partner(new UniqueId("partner-id"), "Ubuntu", true);
    const partnerRepository: IPartnerRepository = {
      save: vi.fn(),
      findById: vi.fn().mockResolvedValue(partner),
      findAll: vi.fn(),
      update: vi.fn().mockResolvedValue(partner),
    };
    const updatePartner = new UpdatePartner(partnerRepository);
    const request = { id: "partner-id", name: "Canonical" };

    const result = await updatePartner.execute(request);

    expect(result.getName()).toBe("Canonical");
    expect(partnerRepository.findById).toHaveBeenCalledWith("partner-id");
    expect(partnerRepository.update).toHaveBeenCalledTimes(1);
    expect(partnerRepository.update).toHaveBeenCalledWith(result);
  });

  it("should activate the partner", async () => {
    const partner = new Partner(new UniqueId("partner-id"), "Ubuntu", false);
    const partnerRepository: IPartnerRepository = {
      save: vi.fn(),
      findById: vi.fn().mockResolvedValue(partner),
      findAll: vi.fn(),
      update: vi.fn().mockResolvedValue(partner),
    };
    const updatePartner = new UpdatePartner(partnerRepository);
    const request = { id: "partner-id", active: true };

    const result = await updatePartner.execute(request);

    expect(result.isActive()).toBe(true);
    expect(partnerRepository.update).toHaveBeenCalledWith(result);
  });

  it("should deactivate the partner", async () => {
    const partner = new Partner(new UniqueId("partner-id"), "Ubuntu", true);
    const partnerRepository: IPartnerRepository = {
      save: vi.fn(),
      findById: vi.fn().mockResolvedValue(partner),
      findAll: vi.fn(),
      update: vi.fn().mockResolvedValue(partner),
    };
    const updatePartner = new UpdatePartner(partnerRepository);
    const request = { id: "partner-id", active: false };

    const result = await updatePartner.execute(request);

    expect(result.isActive()).toBe(false);
    expect(partnerRepository.update).toHaveBeenCalledWith(result);
  });

  it("should update name and active status", async () => {
    const partner = new Partner(new UniqueId("partner-id"), "Ubuntu", true);
    const partnerRepository: IPartnerRepository = {
      save: vi.fn(),
      findById: vi.fn().mockResolvedValue(partner),
      findAll: vi.fn(),
      update: vi.fn().mockResolvedValue(partner),
    };
    const updatePartner = new UpdatePartner(partnerRepository);
    const request = { id: "partner-id", name: "Canonical", active: false };

    const result = await updatePartner.execute(request);

    expect(result.getName()).toBe("Canonical");
    expect(result.isActive()).toBe(false);
    expect(partnerRepository.update).toHaveBeenCalledWith(result);
  });

  it("should throw PartnerNotFoundError if partner does not exist", async () => {
    const partnerRepository: IPartnerRepository = {
      save: vi.fn(),
      findById: vi.fn().mockResolvedValue(null),
      findAll: vi.fn(),
      update: vi.fn(),
    };
    const updatePartner = new UpdatePartner(partnerRepository);
    const request = { id: "missing-id", name: "Canonical" };

    const act = () => updatePartner.execute(request);

    await expect(act).rejects.toThrow(PartnerNotFoundError);
    expect(partnerRepository.update).not.toHaveBeenCalled();
  });

  it("should throw an error if name is empty", async () => {
    const partner = new Partner(new UniqueId("partner-id"), "Ubuntu", true);
    const partnerRepository: IPartnerRepository = {
      save: vi.fn(),
      findById: vi.fn().mockResolvedValue(partner),
      findAll: vi.fn(),
      update: vi.fn(),
    };
    const updatePartner = new UpdatePartner(partnerRepository);
    const request = { id: "partner-id", name: "   " };

    const act = () => updatePartner.execute(request);

    await expect(act).rejects.toThrow("Name cannot be empty");
    expect(partnerRepository.update).not.toHaveBeenCalled();
  });
});