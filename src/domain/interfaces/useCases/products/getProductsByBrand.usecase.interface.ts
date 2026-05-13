import { GetProductsByBrandResponseDTO } from "../../../../application/dto/products/getProductsByBrand";

export interface IGetProductsByBrandUseCase {
  execute(brandId: string): Promise<GetProductsByBrandResponseDTO[]>
}