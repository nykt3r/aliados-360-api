import { beforeEach, describe, expect, it, vi } from 'vitest'
import { GetProductsByBrandUseCase } from "../../../../src/application/useCases/products/getProductsByBrand.usecase";
import { IProductRepository } from "../../../../src/domain/interfaces/repositories/product.repository.interface";
import { IBrandRepository } from "../../../../src/domain/interfaces/repositories/brand.repository.interface";
import { Product } from "../../../../src/domain/entities/product.entity";
import { Brand } from "../../../../src/domain/entities/brand.entity";
import { UniqueId } from "../../../../src/domain/valueObjects/uniqueId.vo";
import { GetProductsByBrandRequestDTO, GetProductsByBrandResponseDTO } from "../../../../src/application/dto/products/getProductsByBrand.dto";

describe('GetProductsByBrandUseCase', () => {
    let productRepository: IProductRepository;
    let brandRepository: IBrandRepository;
    let useCase: GetProductsByBrandUseCase;

    beforeEach(() => {
        productRepository = {
            save: vi.fn(),
            findByBrandId: vi.fn(),
            findById: vi.fn(),
        };
        brandRepository = {
            save: vi.fn(),
            findByPartnerId: vi.fn(),
            findById: vi.fn(),
        };
        useCase = new GetProductsByBrandUseCase(productRepository, brandRepository);
    });

    //Success case of getting products by brand id
    it('should return products by brand id', async () => {
        const brand = new Brand(new UniqueId("550e8400-e29b-41d4-a716-446655440001"), "Azure", new UniqueId("550e8400-e29b-41d4-a716-446655440002"), true);
        const product1 = new Product(new UniqueId("550e8400-e29b-41d4-a716-446655440003"), "Azure VM", new UniqueId("550e8400-e29b-41d4-a716-446655440001"), true);
        const product2 = new Product(new UniqueId("550e8400-e29b-41d4-a716-446655440004"), "Azure Storage", new UniqueId("550e8400-e29b-41d4-a716-446655440001"), true);

        brandRepository.findById = vi.fn().mockResolvedValue(brand);
        productRepository.findByBrandId = vi.fn().mockResolvedValue([product1, product2]);

        const request: GetProductsByBrandRequestDTO = { brandId: "550e8400-e29b-41d4-a716-446655440001" };
        const result: GetProductsByBrandResponseDTO[] = await useCase.execute(request);

        expect(result).toBeDefined();
        expect(result).toEqual([
            {
                id: "550e8400-e29b-41d4-a716-446655440003",
                name: "Azure VM",
                brandId: "550e8400-e29b-41d4-a716-446655440001",
                active: true
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440004",
                name: "Azure Storage",
                brandId: "550e8400-e29b-41d4-a716-446655440001",
                active: true
            }
        ]);
        expect(brandRepository.findById).toHaveBeenCalledTimes(1);
        expect(brandRepository.findById).toHaveBeenCalledWith("550e8400-e29b-41d4-a716-446655440001");
        expect(productRepository.findByBrandId).toHaveBeenCalledTimes(1);
        expect(productRepository.findByBrandId).toHaveBeenCalledWith("550e8400-e29b-41d4-a716-446655440001");
    });

    //Case of getting products by brand id when brand does not exist
    it('should return empty array when brand does not exist', async () => {
        brandRepository.findById = vi.fn().mockResolvedValue(null);

        const request: GetProductsByBrandRequestDTO = {
            brandId: "missing-id",
        };

        const act = () => useCase.execute(request);

        await expect(act).rejects.toThrow("Brand not found");
        expect(brandRepository.findById).toHaveBeenCalledTimes(1);
        expect(brandRepository.findById).toHaveBeenCalledWith("missing-id");
        expect(productRepository.findByBrandId).not.toHaveBeenCalled();
        expect(productRepository.findByBrandId).toHaveBeenCalledTimes(0);
    });

    //Case of getting products by brand id when brand has no products
    it('should return empty array when brand has no products', async () => {
        const brand = new Brand(new UniqueId("550e8400-e29b-41d4-a716-446655440001"), "Azure", new UniqueId("550e8400-e29b-41d4-a716-446655440002"), true);
        brandRepository.findById = vi.fn().mockResolvedValue(brand);
        productRepository.findByBrandId = vi.fn().mockResolvedValue([]);

        const request: GetProductsByBrandRequestDTO = { brandId: "550e8400-e29b-41d4-a716-446655440001" };
        const result: GetProductsByBrandResponseDTO[] = await useCase.execute(request);

        expect(result).toBeDefined();
        expect(result).toEqual([]);
        expect(brandRepository.findById).toHaveBeenCalledTimes(1);
        expect(brandRepository.findById).toHaveBeenCalledWith("550e8400-e29b-41d4-a716-446655440001");
        expect(productRepository.findByBrandId).toHaveBeenCalledTimes(1);
        expect(productRepository.findByBrandId).toHaveBeenCalledWith("550e8400-e29b-41d4-a716-446655440001");
    });

    //Error case creating a Product when getting products fails due to an unexpected error
    it("should throw an error when getting products fails", async () => {
        const brand = new Brand(new UniqueId("550e8400-e29b-41d4-a716-446655440001"), "Azure VM", new UniqueId("550e8400-e29b-41d4-a716-446655440002"), true);
        brandRepository.findById = vi.fn().mockResolvedValue(brand);
        productRepository.findByBrandId = vi.fn().mockResolvedValue(null);

        const request: GetProductsByBrandRequestDTO = {
            brandId: "550e8400-e29b-41d4-a716-446655440001",
        };

        const act = () => useCase.execute(request);

        await expect(act).rejects.toThrow("Error getting Products");
        expect(brandRepository.findById).toHaveBeenCalledTimes(1);
        expect(productRepository.findByBrandId).toHaveBeenCalledTimes(1);
    });

});