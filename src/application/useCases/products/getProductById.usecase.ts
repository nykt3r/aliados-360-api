import { IGetProductByIdUseCase } from "../../../domain/interfaces/useCases/products/getProductById.usecase.interface";
import { IProductRepository } from "../../../domain/interfaces/repositories/product.repository.interface";
import {
  GetProductByIdRequestDTO,
  GetProductByIdResponseDTO,
} from "../../dto/products/getProductById.dto";
import { NotFoundError } from "../../../shared/errors/app.error";

export class GetProductByIdUseCase implements IGetProductByIdUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(req: GetProductByIdRequestDTO): Promise<GetProductByIdResponseDTO> {
    const product = await this.productRepository.findById(req.id);
    if (!product) throw new NotFoundError("Product not found");

    const result: GetProductByIdResponseDTO = {
      id: product.getId(),
      name: product.getName(),
      brandId: product.getBrandId(),
      active: product.isActive(),
    };

    return result;
  }
}
