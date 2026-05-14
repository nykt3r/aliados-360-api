import { ICreateProductUseCase } from "../../../domain/interfaces/useCases/products/createProduct.usecase.interface";
import { IProductRepository } from "../../../domain/interfaces/repositories/product.repository.interface";
import { IBrandRepository } from "../../../domain/interfaces/repositories/brand.repository.interface";
import { CreateProductRequestDTO, CreateProductResponseDTO } from "../../dto/products/createProduct.dto";
import { UniqueId } from "../../../domain/valueObjects/uniqueId.vo";
import { Product } from "../../../domain/entities/product.entity";
import { AppError, BadRequestError, NotFoundError } from "../../../shared/errors/app.error";

export class CreateProductUseCase implements ICreateProductUseCase {
    constructor(
        private readonly productRepository: IProductRepository,
        private readonly brandRepository: IBrandRepository
    ) { }

    async execute(req: CreateProductRequestDTO): Promise<CreateProductResponseDTO> {

        const existingBrand = await this.brandRepository.findById(req.brandId);
        if (!existingBrand) throw new NotFoundError("Brand not found");

        const products = await this.productRepository.findByBrandId(req.brandId);
        const duplicatedProduct = products.find(product => product.getName().toLowerCase() === req.name.toLowerCase());
        if (duplicatedProduct) throw new BadRequestError("Product already exists for this brand");

        const newuniqueId = new UniqueId();
        const brandId = new UniqueId(req.brandId);
        const newProduct = new Product(newuniqueId, req.name, brandId, true);

        const savedProduct = await this.productRepository.save(newProduct);
        if (!savedProduct) throw new AppError("Error saving Product");

        const result: CreateProductResponseDTO = {
            id: savedProduct.getId(),
            name: savedProduct.getName(),
            brandId: savedProduct.getBrandId(),
            active: savedProduct.isActive()
        };

        return result;
    };
    
}