import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GetBrandByIdUseCase } from '../../../../src/application/useCases/brands/getBrandById.usecase';
import { IBrandRepository } from '../../../../src/domain/interfaces/repositories/brand.repository.interface';
import { Brand } from '../../../../src/domain/entities/brand.entity';
import { UniqueId } from '../../../../src/domain/valueObjects/uniqueId.vo';
import { GetBrandByIdRequestDTO, GetBrandByIdResponseDTO } from '../../../../src/application/dto/brands/getBrandById.dto';

describe('GetBrandById Use Case', () => {

    let brandRepository: IBrandRepository;
    let useCase: GetBrandByIdUseCase;

    beforeEach(() => {
        brandRepository = {
            save: vi.fn(),
            findByPartnerId: vi.fn(),
            findById: vi.fn(),
        };
        useCase = new GetBrandByIdUseCase(brandRepository);
    });

    //Success case of getting a brand by id
    it('should return a brand by id', async () => {
        const brand = new Brand(new UniqueId("brand-id"), "Azure", new UniqueId("partner-id"), true);
        brandRepository.findById = vi.fn().mockResolvedValue(brand);

        const request: GetBrandByIdRequestDTO = { id: "brand-id" };
        const result: GetBrandByIdResponseDTO = await useCase.execute(request);

        expect(result).toBeDefined();
        expect(result).toEqual({
            id: "brand-id",
            name: "Azure",
            partnerId: "partner-id",
            active: true
        });
        expect(brandRepository.findById).toHaveBeenCalledTimes(1);
        expect(brandRepository.findById).toHaveBeenCalledWith("brand-id");
    });

    //Error case of getting a brand by id that does not exist
    it('should throw an error if brand is not found', async () => {
        brandRepository.findById = vi.fn().mockResolvedValue(null);

        const request: GetBrandByIdRequestDTO = { id: "missing-id" };

        const act = () => useCase.execute(request);

        await expect(act).rejects.toThrow("Brand not found");
        expect(brandRepository.findById).toHaveBeenCalledTimes(1);
        expect(brandRepository.findById).toHaveBeenCalledWith("missing-id");
    });
    
});