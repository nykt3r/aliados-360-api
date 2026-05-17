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
        const brand = new Brand(new UniqueId("brand-id"), "Azure", new UniqueId("partner-id"), true);
        const product1 = new Product(new UniqueId("product-id-1"), "Azure VM", new UniqueId("brand-id"), true);
        const product2 = new Product(new UniqueId("product-id-2"), "Azure Storage", new UniqueId("brand-id"), true);

        brandRepository.findById = vi.fn().mockResolvedValue(brand);
        productRepository.findByBrandId = vi.fn().mockResolvedValue([product1, product2]);

        const request: GetProductsByBrandRequestDTO = { brandId: "brand-id" };
        const result: GetProductsByBrandResponseDTO[] = await useCase.execute(request);

        expect(result).toBeDefined();
        expect(result).toEqual([
            {
                id: "product-id-1",
                name: "Azure VM",
                brandId: "brand-id",
                active: true
            },
            {
                id: "product-id-2",
                name: "Azure Storage",
                brandId: "brand-id",
                active: true
            }
        ]);
        expect(brandRepository.findById).toHaveBeenCalledTimes(1);
        expect(brandRepository.findById).toHaveBeenCalledWith("brand-id");
        expect(productRepository.findByBrandId).toHaveBeenCalledTimes(1);
        expect(productRepository.findByBrandId).toHaveBeenCalledWith("brand-id");
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
        const brand = new Brand(new UniqueId("brand-id"), "Azure", new UniqueId("partner-id"), true);
        brandRepository.findById = vi.fn().mockResolvedValue(brand);
        productRepository.findByBrandId = vi.fn().mockResolvedValue([]);

        const request: GetProductsByBrandRequestDTO = { brandId: "brand-id" };
        const result: GetProductsByBrandResponseDTO[] = await useCase.execute(request);

        expect(result).toBeDefined();
        expect(result).toEqual([]);
        expect(brandRepository.findById).toHaveBeenCalledTimes(1);
        expect(brandRepository.findById).toHaveBeenCalledWith("brand-id");
        expect(productRepository.findByBrandId).toHaveBeenCalledTimes(1);
        expect(productRepository.findByBrandId).toHaveBeenCalledWith("brand-id");
    });

    //Error case creating a Product when getting products fails due to an unexpected error
    it("should throw an error when getting products fails", async () => {
        const brand = new Brand(new UniqueId("brand-id"), "Azure VM", new UniqueId("partner-id"), true);
        brandRepository.findById = vi.fn().mockResolvedValue(brand);
        productRepository.findByBrandId = vi.fn().mockResolvedValue(null);

        const request: GetProductsByBrandRequestDTO = {
            brandId: "brand-id",
        };

        const act = () => useCase.execute(request);

        await expect(act).rejects.toThrow("Error getting Products");
        expect(brandRepository.findById).toHaveBeenCalledTimes(1);
        expect(productRepository.findByBrandId).toHaveBeenCalledTimes(1);
    });

});