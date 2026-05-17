import { beforeEach, describe, expect, it, vi} from 'vitest';
import { IProductRepository } from '../../../../src/domain/interfaces/repositories/product.repository.interface';
import { IBrandRepository } from '../../../../src/domain/interfaces/repositories/brand.repository.interface';
import { CreateProductUseCase } from '../../../../src/application/useCases/products/createProduct.usecase';
import { CreateProductRequestDTO, CreateProductResponseDTO } from '../../../../src/application/dto/products/createProduct.dto';

describe('CreateProduct Use Case', () => {

    let productRepository: IProductRepository;
    let brandRepository: IBrandRepository;
    let useCase: CreateProductUseCase;

    beforeEach(() => {
        productRepository = {
            save: vi.fn(),
            findByBrandId: vi.fn(),
            findById: vi.fn(),
        }
        brandRepository = {
            save: vi.fn(),
            findByPartnerId: vi.fn(),
            findById: vi.fn(),
        }
        useCase = new CreateProductUseCase(productRepository, brandRepository)
    });

    //success case of creating a product
    it('should create and save a product', async () => {
        brandRepository.findById = vi.fn().mockResolvedValue({ getId: () => "brand-id" });
        productRepository.findByBrandId = vi.fn().mockResolvedValue([]);
        productRepository.save = vi.fn().mockImplementation(async (product) => product);

        const request: CreateProductRequestDTO = { 
            id: "product-id",
            name: "Azure Virtual Machine",
            brandId: "brand-id",
            active: true
        };

        const result: CreateProductResponseDTO = await useCase.execute(request);

        expect(result).toBeDefined();
        expect(result).toEqual({
            id: "product-id",
            name: "Azure Virtual Machine",
            brandId: "brand-id",
            active: true
        });
        expect(brandRepository.findById).toHaveBeenCalledTimes(1)
        expect(productRepository.findByBrandId).toHaveBeenCalledTimes(1);
        expect(productRepository.save).toHaveBeenCalledTimes(1);
        expect(productRepository.save).toHaveBeenCalledWith(
            expect.objectContaining({
                getId: expect.any(Function),
                getName: expect.any(Function),
                getBrandId: expect.any(Function),
                isActive: expect.any(Function),
            })
        );
    });

    //error case of creating a product with non-existing brand
    it('should throw an error if brand does not exist', async () => {
        brandRepository.findById = vi.fn().mockResolvedValue(null);

        const request: CreateProductRequestDTO = { 
            id: "product-id",
            name: "Azure Virtual Machine",
            brandId: "non-existing-brand-id",
            active: true
        };

        await expect(useCase.execute(request)).rejects.toThrow('Brand not found');
        expect(productRepository.findByBrandId).not.toHaveBeenCalled();
        expect(productRepository.save).not.toHaveBeenCalled();
    });

    //error case of creating a product with same name under the same brand
    it('should throw an error if product already exists for the brand', async () => {
        brandRepository.findById = vi.fn().mockResolvedValue({ getId: () => "brand-id" });
        productRepository.findByBrandId = vi.fn().mockResolvedValue([{ getName: () => "Azure Virtual Machine" }]);

        const request: CreateProductRequestDTO = { 
            id: "product-id",
            name: "Azure Virtual Machine",
            brandId: "brand-id",
            active: true
        };

        await expect(useCase.execute(request)).rejects.toThrow('Product already exists for this brand');
        expect(productRepository.save).not.toHaveBeenCalled();
    });

    //Error case of creating a product when product name already exists ignoring case sensitivity under the same brand
    it('should throw an error if product with same name already exists for the brand ignoring case sensitivity', async () => {
        brandRepository.findById = vi.fn().mockResolvedValue({ getId: () => "brand-id" });
        productRepository.findByBrandId = vi.fn().mockResolvedValue([{ getName: () => "Azure Virtual Machine" }]);

        const request: CreateProductRequestDTO = { 
            id: "product-id",
            name: "azure virtual machine",
            brandId: "brand-id",
            active: true
        };

        await expect(useCase.execute(request)).rejects.toThrow('Product already exists for this brand');
        expect(productRepository.save).not.toHaveBeenCalled();
    });

    //Error case of creating a product when saving fails
    it('should throw an error if saving fails', async () => {
        brandRepository.findById = vi.fn().mockResolvedValue({ getId: () => "brand-id" });
        productRepository.findByBrandId = vi.fn().mockResolvedValue([]);
        productRepository.save = vi.fn().mockResolvedValue(null);

        const request: CreateProductRequestDTO = { 
            id: "product-id",
            name: "Azure Virtual Machine",
            brandId: "brand-id",
            active: true
        };

        await expect(useCase.execute(request)).rejects.toThrow('Error saving Product');
        expect(brandRepository.findById).toHaveBeenCalledTimes(1);
        expect(productRepository.findByBrandId).toHaveBeenCalledTimes(1);
        expect(productRepository.save).toHaveBeenCalledTimes(1);

    });

});