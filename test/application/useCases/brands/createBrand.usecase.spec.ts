import { beforeEach, describe, expect, it, vi} from 'vitest';
import { IBrandRepository } from '../../../../src/domain/interfaces/repositories/brand.repository.interface';
import { IPartnerRepository } from '../../../../src/domain/interfaces/repositories/partner.repository.interface';
import { CreateBrandUseCase } from '../../../../src/application/useCases/brands/createBrand.usecase';
import { CreateBrandRequestDTO, CreateBrandResponseDTO } from '../../../../src/application/dto/brands/createBrand.dto';

describe('CreateBrand Use Case', () => {

    let brandRepository: IBrandRepository;
    let partnerRepository: IPartnerRepository;
    let useCase: CreateBrandUseCase;

    beforeEach(() => {
        brandRepository = {
            save: vi.fn(),
            findByPartnerId: vi.fn(),
            findById: vi.fn(),
        }
        partnerRepository = {
            save: vi.fn(),
            findById: vi.fn(),
            findAll: vi.fn(),
            update: vi.fn(),
        }
        useCase = new CreateBrandUseCase(brandRepository, partnerRepository)
    });

    //success case of creating a brand
    it('should create and save a brand', async () => {
        partnerRepository.findById = vi.fn().mockResolvedValue({ getId: () => "partner-id" });
        brandRepository.findByPartnerId = vi.fn().mockResolvedValue([]);
        brandRepository.save = vi.fn().mockImplementation(async (brand) => brand);

        const request: CreateBrandRequestDTO = { 
            id: "brand-id",
            name: "Azure",
            partnerId: "partner-id",
            active: true
        };

        const result: CreateBrandResponseDTO = await useCase.execute(request);

        expect(result).toBeDefined();
        expect(result).toEqual({
            id: "brand-id",
            name: "Azure",
            partnerId: "partner-id",
            active: true
        });

        expect(partnerRepository.findById).toHaveBeenCalledTimes(1)
        expect(brandRepository.findByPartnerId).toHaveBeenCalledTimes(1);
        expect(brandRepository.save).toHaveBeenCalledWith(
            expect.objectContaining({
                getId: expect.any(Function),
                getName: expect.any(Function),
                getPartnerId: expect.any(Function),
                isActive: expect.any(Function),
            })
        );

    });    

    //Error case of creating a brand when partner does not exist
    it('should throw an error if partner does not exist', async () => {
        partnerRepository.findById = vi.fn().mockResolvedValue(null);

        const request: CreateBrandRequestDTO = { 
            id: "brand-id",
            name: "Azure",
            partnerId: "partner-id",
            active: true
        };

        await expect(useCase.execute(request)).rejects.toThrow("Partner not found");
        expect(brandRepository.findByPartnerId).not.toHaveBeenCalled();
        expect(brandRepository.save).not.toHaveBeenCalled();
    });

    //Error case of creating a brand when brand with same name already exists for the partner
    it('should throw an error if brand with same name already exists for the partner', async () => {
        partnerRepository.findById = vi.fn().mockResolvedValue({ getId: () => "partner-id" });
        brandRepository.findByPartnerId = vi.fn().mockResolvedValue([{ getName: () => "Azure" }]);

        const request: CreateBrandRequestDTO = { 
            id: "brand-id",
            name: "Azure",
            partnerId: "partner-id",
            active: true
        };

        await expect(useCase.execute(request)).rejects.toThrow("Brand name already exists for this partner");
        expect(brandRepository.save).not.toHaveBeenCalled();
    });

    //Error case of creating a brand when saving fails
    it('should throw an error if saving fails', async () => {
        partnerRepository.findById = vi.fn().mockResolvedValue({ getId: () => "partner-id" });
        brandRepository.findByPartnerId = vi.fn().mockResolvedValue([]);
        brandRepository.save = vi.fn().mockResolvedValue(null);

        const request: CreateBrandRequestDTO = { 
            id: "brand-id",
            name: "Azure",
            partnerId: "partner-id",
            active: true
        };

        await expect(useCase.execute(request)).rejects.toThrow("Error saving Brand");
        expect(partnerRepository.findById).toHaveBeenCalledTimes(1);
        expect(brandRepository.findByPartnerId).toHaveBeenCalledTimes(1);
        expect(brandRepository.save).toHaveBeenCalledTimes(1);
    });

    //Error case of creating a brand when brand name already exists  ignoring case sensitivity for the partner
    it('should throw an error if brand with same name already exists for the partner ignoring case sensitivity', async () => {
        partnerRepository.findById = vi.fn().mockResolvedValue({ getId: () => "partner-id" });
        brandRepository.findByPartnerId = vi.fn().mockResolvedValue([{ getName: () => "Azure" }]);

        const request: CreateBrandRequestDTO = { 
            id: "brand-id",
            name: "azure",
            partnerId: "partner-id",
            active: true
        };

        await expect(useCase.execute(request)).rejects.toThrow("Brand name already exists for this partner");
        expect(brandRepository.save).not.toHaveBeenCalled();
    });

});