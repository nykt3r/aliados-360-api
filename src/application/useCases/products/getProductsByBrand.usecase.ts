import { IGetProductsByBrandUseCase } from "../../../domain/interfaces/useCases/products/getProductsByBrand.usecase.interface";
import { IProductRepository } from "../../../domain/interfaces/repositories/product.repository.interface";
import { IBrandRepository } from "../../../domain/interfaces/repositories/brand.repository.interface";
import {
  GetProductsByBrandRequestDTO,
  GetProductsByBrandResponseDTO,
} from "../../dto/products/getProductsByBrand.dto";
import { NotFoundError } from "../../../shared/errors/app.error";

export class GetProductsByBrandUseCase implements IGetProductsByBrandUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly brandRepository: IBrandRepository
  ) {}

  async execute(req: GetProductsByBrandRequestDTO): Promise<GetProductsByBrandResponseDTO[]> {
    const existingBrand = await this.brandRepository.findById(
      req.brandId,
    );
    if (!existingBrand) throw new NotFoundError("Brand not found");

    const products = await this.productRepository.findByBrandId(req.brandId);
    if (!products) throw new NotFoundError("Error getting Products");

    const result: GetProductsByBrandResponseDTO[] = products.map((product) => ({
      id: product.getId(),
      name: product.getName(),
      brandId: product.getBrandId(),
      active: product.isActive(),
    }));

    return result;
  }
}
