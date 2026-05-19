import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreatePartnerUseCase } from "../../../../src/application/useCases/partners/createPartner.usecase";
import { IPartnerRepository } from "../../../../src/domain/interfaces/repositories/partner.repository.interface";
import { CreatePartnerRequestDTO, CreatePartnerResponseDTO } from "../../../../src/application/dto/partners/createPartner.dto";

describe("CreatePartner Use Case", () => {

    let partnerRepository: IPartnerRepository;
    let useCase: CreatePartnerUseCase;

    beforeEach(() => {
        partnerRepository = {
            save: vi.fn(),
            findById: vi.fn(),
            findAll: vi.fn(),
            update: vi.fn(),
        }
        useCase = new CreatePartnerUseCase(partnerRepository)
    });
    
    it("should create and save a partner", async () => {
        partnerRepository.findById = vi.fn().mockResolvedValue(null);
        partnerRepository.save = vi.fn().mockImplementation(async (partner) => partner);

        const request: CreatePartnerRequestDTO = { 
            id: "550e8400-e29b-41d4-a716-446655440001",
            name: "Ubuntu",
            active: true
        };

        const result: CreatePartnerResponseDTO = await useCase.execute(request);

        expect(result).toBeDefined();
        expect(result).toEqual({
            id: "550e8400-e29b-41d4-a716-446655440001",
            name: "Ubuntu",
            active: true
        });
    
        expect(partnerRepository.findById).toHaveBeenCalledTimes(1)
        expect(partnerRepository.save).toHaveBeenCalledTimes(1);
        expect(partnerRepository.save).toHaveBeenCalledWith(
            expect.objectContaining({
                getName: expect.any(Function),
                isActive: expect.any(Function),
                getId: expect.any(Function),
            })
        );
    });

    it("should throw an error if partner already exists", async () => {
        const existingPartner = { getId: () => "550e8400-e29b-41d4-a716-446655440001" };

        partnerRepository.findById = vi.fn().mockResolvedValue(existingPartner);

        const request: CreatePartnerRequestDTO = { 
            id: "550e8400-e29b-41d4-a716-446655440001",
            name: "Ubuntu",
            active: true
        };

        const act = () => useCase.execute(request);

        await expect(act).rejects.toThrow("Partner already exists");
        expect(partnerRepository.save).not.toHaveBeenCalled();
    });

    it("should throw an error if saving fails", async () => {
        partnerRepository.findById = vi.fn().mockResolvedValue(null);
        partnerRepository.save = vi.fn().mockResolvedValue(null);

        const request: CreatePartnerRequestDTO = { 
            id: "550e8400-e29b-41d4-a716-446655440001",
            name: "Ubuntu",
            active: true
        };

        await expect(useCase.execute(request)).rejects.toThrow("Error saving Partner");
        expect(partnerRepository.findById).toHaveBeenCalledTimes(1);
    });
});
