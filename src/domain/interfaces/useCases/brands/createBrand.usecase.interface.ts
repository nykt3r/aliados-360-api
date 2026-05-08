import { CreateBrandRequestDTO, CreateBrandResponseDTO } from "../../../../application/dto/brands/createBrand.dto";

export interface ICreateBrandUseCase {
    execute(req: CreateBrandRequestDTO): Promise<CreateBrandResponseDTO>
}