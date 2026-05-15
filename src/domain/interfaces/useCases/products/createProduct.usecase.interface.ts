import { CreateProductRequestDTO, CreateProductResponseDTO } from "../../../../application/dto/products/createProduct.dto";

export interface ICreateProductUseCase {
  execute(req: CreateProductRequestDTO): Promise<CreateProductResponseDTO>;
}
