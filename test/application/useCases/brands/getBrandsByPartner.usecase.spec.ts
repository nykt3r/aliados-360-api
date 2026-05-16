import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GetBrandsByPartnerUseCase } from '../../../../src/application/useCases/brands/getBrandsByPartner.usecase';
import { IPartnerRepository } from '../../../../src/domain/interfaces/repositories/partner.repository.interface';
import { IBrandRepository } from '../../../../src/domain/interfaces/repositories/brand.repository.interface';
import { Partner } from '../../../../src/domain/entities/partner.entity';
import { Brand } from '../../../../src/domain/entities/brand.entity';
import { UniqueId } from '../../../../src/domain/valueObjects/uniqueId.vo';
import { GetBrandsByPartnerRequestDTO, GetBrandsByPartnerResponseDTO } from '../../../../src/application/dto/brands/getBrandsByPartner.dto';
import { GetBrandByIdRequestDTO, GetBrandByIdResponseDTO } from '../../../../src/application/dto/brands/getBrandById.dto';

describe('GetBrandsByPartner Use Case', () => {

    let partnerRepository: IPartnerRepository;
    let brandRepository: IBrandRepository;
    let useCase: GetBrandsByPartnerUseCase;

    beforeEach(() => {
        partnerRepository = {
            save: vi.fn(),
            findById: vi.fn(),
            findAll: vi.fn(),
            update: vi.fn(),
        };
        brandRepository = {
            save: vi.fn(),
            findByPartnerId: vi.fn(),
            findById: vi.fn(),
        };

        useCase = new GetBrandsByPartnerUseCase(brandRepository, partnerRepository);
    });

    //Success case of getting brands by partner id
    it('should return brands by partner id', async () => {
        const partner = new Partner(new UniqueId("partner-id"), "Microsoft", true);
        const brand1 = new Brand(new UniqueId("brand-id-1"), "Azure", new UniqueId("partner-id"), true);
        const brand2 = new Brand(new UniqueId("brand-id-2"), "Office", new UniqueId("partner-id"), true);

        partnerRepository.findById = vi.fn().mockResolvedValue(partner);
        brandRepository.findByPartnerId = vi.fn().mockResolvedValue([brand1, brand2]);

        const request: GetBrandsByPartnerRequestDTO = { partnerId: "partner-id" };
        const result: GetBrandsByPartnerResponseDTO[] = await useCase.execute(request);

        expect(result).toBeDefined();
        expect(result).toEqual([
            {
                id: "brand-id-1",
                name: "Azure",
                partnerId: "partner-id",
                active: true
            },
            {
                id: "brand-id-2",
                name: "Office",
                partnerId: "partner-id",
                active: true
            }
        ]);
        expect(partnerRepository.findById).toHaveBeenCalledTimes(1);
        expect(partnerRepository.findById).toHaveBeenCalledWith("partner-id");
        expect(brandRepository.findByPartnerId).toHaveBeenCalledTimes(1);
        expect(brandRepository.findByPartnerId).toHaveBeenCalledWith("partner-id");
    });

    //Error case of getting brands by partner id that does not exist
    it('should throw an error if partner is not found', async () => {
        partnerRepository.findById = vi.fn().mockResolvedValue(null);

        const request: GetBrandsByPartnerRequestDTO = { partnerId: "missing-id" };

        const act = () => useCase.execute(request);

        await expect(act).rejects.toThrow("Partner not found");
        expect(partnerRepository.findById).toHaveBeenCalledTimes(1);
        expect(partnerRepository.findById).toHaveBeenCalledWith("missing-id");
        expect(brandRepository.findByPartnerId).not.toHaveBeenCalled();
        expect(brandRepository.findByPartnerId).toHaveBeenCalledTimes(0);
    });

    //Error case of getting brands by partner id that has no brands
    it('should return an empty array if partner has no brands', async () => {
        const partner = new Partner(new UniqueId("partner-id"), "Microsoft", true);
        brandRepository.findByPartnerId = vi.fn().mockResolvedValue([]);

        partnerRepository.findById = vi.fn().mockResolvedValue(partner);

        const request: GetBrandsByPartnerRequestDTO = { partnerId: "partner-id" };
        const result: GetBrandsByPartnerResponseDTO[] = await useCase.execute(request);

        expect(result).toBeDefined();
        expect(result).toEqual([]);
        expect(partnerRepository.findById).toHaveBeenCalledTimes(1);
        expect(partnerRepository.findById).toHaveBeenCalledWith("partner-id");
        expect(brandRepository.findByPartnerId).toHaveBeenCalledTimes(1);
        expect(brandRepository.findByPartnerId).toHaveBeenCalledWith("partner-id");
    });

    //Error case creating a brand when getting brand fails due to an unexpected error
    it("should throw an error when getting brands fails", async () => {
        const partner = new Partner(new UniqueId("partner-id"), "Ubuntu", true);
        partnerRepository.findById = vi.fn().mockResolvedValue(partner);
        brandRepository.findByPartnerId = vi.fn().mockResolvedValue(null);

        const request: GetBrandsByPartnerRequestDTO = {
            partnerId: "partner-id",
        };

        const act = () => useCase.execute(request);

        await expect(act).rejects.toThrow("Error getting Brands");
        expect(partnerRepository.findById).toHaveBeenCalledTimes(1);
        expect(brandRepository.findByPartnerId).toHaveBeenCalledTimes(1);
    });
    
});
