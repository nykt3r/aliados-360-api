import { IGetBrandByIdUseCase } from "../../../domain/interfaces/useCases/brands/getBrandById.usecase.interface";
import { IBrandRepository } from "../../../domain/interfaces/repositories/brand.repository.interface";
import { GetBrandByIdRequestDTO, GetBrandByIdResponseDTO } from "../../dto/brands/getBrandById.dto";
import { NotFoundError } from "../../../shared/errors/app.error";

export class GetBrandByIdUseCase implements IGetBrandByIdUseCase {
    constructor(
        private readonly brandRepository: IBrandRepository
    ) { }

    async execute(req: GetBrandByIdRequestDTO): Promise<GetBrandByIdResponseDTO> {
        const brand = await this.brandRepository.findById(req.id);
        if (!brand) throw new NotFoundError("Brand not found");

        const result: GetBrandByIdResponseDTO = {
            id: brand.getId(),
            name: brand.getName(),
            partnerId: brand.getPartnerId(),
            active: brand.isActive()
        };

        return result;
        
    };

}