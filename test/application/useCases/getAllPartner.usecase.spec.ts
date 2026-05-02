import { beforeEach, describe, expect, it, vi } from "vitest";
import { IPartnerRepository } from "../../../src/domain/interfaces/repositories/partner.repository.interface";
import { GetAllPartnersUseCase } from "../../../src/application/useCases/partners/getAllPartners.usecase";
import { Partner } from "../../../src/domain/entities/partner.entity";
import { UniqueId } from "../../../src/domain/valueObjects/uniqueId.vo";
import { GetAllPartnersResponseDTO } from "../../../src/application/dto/partners/getAllPartners.dto";

describe("GetAllPartners Use Case", () => {

    let partnerRepository: IPartnerRepository;
    let useCase: GetAllPartnersUseCase;

    beforeEach(() => {
        partnerRepository = {
            save: vi.fn(),
            findById: vi.fn(),
            findAll: vi.fn(),
            update: vi.fn(),
        }
        useCase = new GetAllPartnersUseCase(partnerRepository)
    });

    it("should return all partners", async () => {
        const partners = [
            new Partner(new UniqueId(), "Ubuntu", true),
            new Partner(new UniqueId(), "Canonical", false),
            new Partner(new UniqueId(), "Arch")
        ];

        partnerRepository.findAll = vi.fn().mockResolvedValue(partners);

        const result: GetAllPartnersResponseDTO[] = await useCase.execute();

        expect(result).toEqual(
            partners.map(p => ({
            id: p.getId(),
            name: p.getName(),
            active: p.isActive()
            }))
        );

        expect(result).toHaveLength(3);
        expect(partnerRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it("should return an empty array if there are no partners", async () => {
        partnerRepository.findAll = vi.fn().mockResolvedValue([]);

        const result = await useCase.execute();

        expect(result).toEqual([]);
        expect(partnerRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if repository returns null", async () => {
        partnerRepository.findAll = vi.fn().mockResolvedValue(null);
        await expect(useCase.execute()).rejects.toThrow("Error getting Partners");
    });
});
