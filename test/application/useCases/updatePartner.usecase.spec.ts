import { beforeEach, describe, expect, it, vi } from "vitest";
import { UpdatePartnerUseCase } from "../../../src/application/useCases/partners/updatePartner.usecase";
import { IPartnerRepository } from "../../../src/domain/interfaces/repositories/partner.repository.interface";
import { UpdatePartnerRequestDTO, UpdatePartnerResponseDTO } from "../../../src/application/dto/partners/updatePartner.dto";
import { Partner } from "../../../src/domain/entities/partner.entity";
import { UniqueId } from "../../../src/domain/valueObjects/uniqueId.vo";

describe("UpdatePartner Use Case", () => {

    let partnerRepository: IPartnerRepository;
    let useCase: UpdatePartnerUseCase;

    beforeEach(() => {
        partnerRepository = {
            save: vi.fn(),
            findById: vi.fn(),
            findAll: vi.fn(),
            update: vi.fn(),
        }
        useCase = new UpdatePartnerUseCase(partnerRepository)
    });

    it("should update the partner name", async () => {
        const existingPartner = new Partner(new UniqueId("partner-id"), "Ubuntu", true);

        partnerRepository.findById = vi.fn().mockResolvedValue(existingPartner);
        partnerRepository.update = vi.fn().mockImplementation(async (partner) => partner);

        const request: UpdatePartnerRequestDTO = { id: "partner-id", name: "Canonical" };
        const result: UpdatePartnerResponseDTO = await useCase.execute(request);

        expect(result).toEqual({
            id: "partner-id",
            name: "Canonical",
            active: true
        });

        expect(partnerRepository.findById).toHaveBeenCalledWith("partner-id");
        expect(partnerRepository.update).toHaveBeenCalledTimes(1);
        expect(partnerRepository.update).toHaveBeenCalledWith(
            expect.objectContaining({
                getName: expect.any(Function),
                isActive: expect.any(Function),
            })
        );
    });

    it("should activate the partner", async () => {
        const existingPartner = new Partner(new UniqueId("partner-id"), "Ubuntu", false);

        partnerRepository.findById = vi.fn().mockResolvedValue(existingPartner);
        partnerRepository.update = vi.fn().mockImplementation(async (partner) => partner);

        const request: UpdatePartnerRequestDTO = { id: "partner-id", active: true };
        const result: UpdatePartnerResponseDTO = await useCase.execute(request);

        expect(result.active).toBe(true);
    });     

    it("should deactivate the partner", async () => {
        const existingPartner = new Partner(new UniqueId("partner-id"), "Ubuntu", true);

        partnerRepository.findById = vi.fn().mockResolvedValue(existingPartner);
        partnerRepository.update = vi.fn().mockImplementation(async (partner) => partner);

        const request: UpdatePartnerRequestDTO = { id: "partner-id", active: false };
        const result: UpdatePartnerResponseDTO = await useCase.execute(request);

        expect(result.active).toBe(false);
    });

    it("should update name and active status", async () => {
        const existingPartner = new Partner(new UniqueId("partner-id"), "Ubuntu", true);

        partnerRepository.findById = vi.fn().mockResolvedValue(existingPartner);
        partnerRepository.update = vi.fn().mockImplementation(async (partner) => partner);

        const request: UpdatePartnerRequestDTO = { 
            id: "partner-id", 
            name: "Canonical", 
            active: false 
        };

        const result: UpdatePartnerResponseDTO = await useCase.execute(request);

        expect(result).toEqual({
            id: "partner-id",
            name: "Canonical",
            active: false
        });
    });

    it("should throw an error if partner does not exist", async () => {
        partnerRepository.findById = vi.fn().mockResolvedValue(null);

        const request: UpdatePartnerRequestDTO = { id: "missing-id", name: "Canonical" };

        await expect(useCase.execute(request)).rejects.toThrow("Partner not found");

        expect(partnerRepository.update).not.toHaveBeenCalled();
    });

    it("should throw an error if update fails", async () => {
        const existingPartner = new Partner(new UniqueId("partner-id"), "Ubuntu", true);

        partnerRepository.findById = vi.fn().mockResolvedValue(existingPartner);
        partnerRepository.update = vi.fn().mockResolvedValue(null);

        const request: UpdatePartnerRequestDTO = { id: "partner-id", name: "Canonical" };
        await expect(useCase.execute(request)).rejects.toThrow("Error updating Partner");
    });
});
