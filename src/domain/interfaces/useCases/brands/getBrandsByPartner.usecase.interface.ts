import { GetBrandsByPartnerResponseDTO } from "../../../../application/dto/brands/getBrandsByPartner.dto";

export interface IGetBrandsByPartnerUseCase {
  execute(partnerId: string): Promise<GetBrandsByPartnerResponseDTO[]>
}