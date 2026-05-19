import { beforeEach, describe, expect, it, vi} from 'vitest'
import { GetProductByIdUseCase } from '../../../../src/application/useCases/products/getProductById.usecase'
import { IProductRepository } from '../../../../src/domain/interfaces/repositories/product.repository.interface'
import { Product } from '../../../../src/domain/entities/product.entity'
import { UniqueId } from '../../../../src/domain/valueObjects/uniqueId.vo'
import { GetProductByIdRequestDTO, GetProductByIdResponseDTO } from '../../../../src/application/dto/products/getProductById.dto'

describe('GetProductById Use Case', () => {

    let productRepository: IProductRepository;
    let useCase: GetProductByIdUseCase;

    beforeEach(() => {
        productRepository = {
            save: vi.fn(),
            findByBrandId: vi.fn(),
            findById: vi.fn(),
        };
        useCase = new GetProductByIdUseCase(productRepository);
    });

    //Success case of getting a product by id
    it('should return a product by id', async () => {
        const product = new Product(new UniqueId("550e8400-e29b-41d4-a716-446655440002"), "Laptop", new UniqueId("550e8400-e29b-41d4-a716-446655440001"), true);
        productRepository.findById = vi.fn().mockResolvedValue(product);

        const request: GetProductByIdRequestDTO = { id: "550e8400-e29b-41d4-a716-446655440002" };
        const result: GetProductByIdResponseDTO = await useCase.execute(request);

        expect(result).toBeDefined();
        expect(result).toEqual({
            id: product.getId(),
            name: product.getName(),
            brandId: product.getBrandId(),
            active: product.isActive()
        });
        expect(productRepository.findById).toHaveBeenCalledTimes(1);
        expect(productRepository.findById).toHaveBeenCalledWith("550e8400-e29b-41d4-a716-446655440002");
    });

    //Error case of getting a product by id that does not exist
    it('should throw an error if product is not found', async () => {
        productRepository.findById = vi.fn().mockResolvedValue(null);

        const request: GetProductByIdRequestDTO = { id: "missing-id" };

        const act = () => useCase.execute(request);

        await expect(act).rejects.toThrow("Product not found");
        expect(productRepository.findById).toHaveBeenCalledTimes(1);
        expect(productRepository.findById).toHaveBeenCalledWith("missing-id");
    });

});