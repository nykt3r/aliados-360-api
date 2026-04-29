import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetPartnerByIdUseCase } from "../../../src/application/useCases/partners/getPartnerById.usecase";
import { IPartnerRepository } from "../../../src/domain/interfaces/repositories/partner.repository.interface";
import { Partner } from "../../../src/domain/entities/partner.entity";
import { UniqueId } from "../../../src/domain/valueObjects/uniqueId.vo";
import { GetPartnerByIdRequestDTO, GetPartnerByIdResponseDTO } from "../../../src/application/dto/partners/getPartnerById.dto";

describe("GetPartnerById Use Case", () => {

    let partnerRepository: IPartnerRepository;
    let useCase: GetPartnerByIdUseCase;

    beforeEach(() => {
        partnerRepository = {
            save: vi.fn(),
            findById: vi.fn(),
            findAll: vi.fn(),
            update: vi.fn(),
        }
        useCase = new GetPartnerByIdUseCase(partnerRepository)
    });

  it("should return a partner when it exists", async () => {
    const partner = new Partner(new UniqueId("partner-id"), "Ubuntu", true);
    partnerRepository.findById = vi.fn().mockResolvedValue(partner);

    const request: GetPartnerByIdRequestDTO = { id: "partner-id" };
    const result: GetPartnerByIdResponseDTO = await useCase.execute(request);

    expect(result).toEqual({
        id: partner.getId(), 
        name: partner.getName(), 
        active: partner.isActive()
    });

    expect(partnerRepository.findById).toHaveBeenCalledTimes(1);
    expect(partnerRepository.findById).toHaveBeenCalledWith("partner-id");
  });

  it("should throw an error when partner does not exist", async () => {
    partnerRepository.findById = vi.fn().mockResolvedValue(null);
    const request: GetPartnerByIdRequestDTO = { id: "missing-id" };

    const act = () => useCase.execute(request);
    
    await expect(act).rejects.toThrow("Partner not found");

    expect(partnerRepository.findById).toHaveBeenCalledTimes(1);
    expect(partnerRepository.findById).toHaveBeenCalledWith("missing-id");
  });
});
