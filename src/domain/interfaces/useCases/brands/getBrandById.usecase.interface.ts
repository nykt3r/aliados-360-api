import { GetBrandByIdRequestDTO, GetBrandByIdResponseDTO } from "../../../../application/dto/brands/getBrandById.dto";

export interface IGetBrandByIdUseCase {
  execute(req: GetBrandByIdRequestDTO): Promise<GetBrandByIdResponseDTO>;
}
