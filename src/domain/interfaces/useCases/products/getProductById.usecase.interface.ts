import { GetProductByIdRequestDTO, GetProductByIdResponseDTO } from "../../../../application/dto/products/getProductById.dto";

export interface IGetProductByIdUseCase {
  execute(req: GetProductByIdRequestDTO): Promise<GetProductByIdResponseDTO>;
}
