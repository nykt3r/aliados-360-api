import { GetBrandsByPartnerRequestDTO, GetBrandsByPartnerResponseDTO } from "../../../../application/dto/brands/getBrandsByPartner.dto";

export interface IGetBrandsByPartnerUseCase {
    execute(req: GetBrandsByPartnerRequestDTO): Promise<GetBrandsByPartnerResponseDTO>
}