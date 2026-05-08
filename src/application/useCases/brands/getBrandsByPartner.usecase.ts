import { IGetBrandsByPartnerUseCase } from "../../../domain/interfaces/useCases/brands/getBrandsByPartner.usecase.interface";
import { IBrandRepository } from "../../../domain/interfaces/repositories/brand.repository.interface";
import { GetBrandsByPartnerRequestDTO, GetBrandsByPartnerResponseDTO } from "../../dto/brands/getBrandsByPartner.dto";
import { AppError, NotFoundError } from "../../../shared/errors/app.error";

export class GetBrandsByPartnerUseCase implements IGetBrandsByPartnerUseCase {
  constructor(
    private readonly brandRepository: IBrandRepository,
    private readonly partnerRepository: IBrandRepository
  ) {}

    async execute(req: GetBrandsByPartnerRequestDTO): Promise<GetBrandsByPartnerResponseDTO> {
        const existingPartner = await this.partnerRepository.findById(req.partnerId);
        if (!existingPartner) throw new NotFoundError('Partner not found');

        const brands = await this.brandRepository.findByPartnerId(req.partnerId);
        if (!brands) throw new AppError('Error retrieving brands for the partner');
        
        const result: GetBrandsByPartnerResponseDTO = {
            brands: brands.map(brand => ({
                id: brand.getId(),
                name: brand.getName(),
                partnerId: brand.getPartnerId(),
                active: brand.isActive()
            }))
        };

        return result;
    }

}
