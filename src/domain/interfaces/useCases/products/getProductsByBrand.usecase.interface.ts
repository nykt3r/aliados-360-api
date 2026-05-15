import { GetProductsByBrandRequestDTO, GetProductsByBrandResponseDTO } from "../../../../application/dto/products/getProductsByBrand.dto";

export interface IGetProductsByBrandUseCase {
  execute(req: GetProductsByBrandRequestDTO): Promise<GetProductsByBrandResponseDTO[]>
}
