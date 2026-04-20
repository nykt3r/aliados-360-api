import { UpdatePartnerRequestDTO, UpdatePartnerResponseDTO } from "../../../../application/dto/partners/updatePartner.dto";

export interface IUpdatePartnerUseCase {
    execute(req: UpdatePartnerRequestDTO): Promise<UpdatePartnerResponseDTO>
}
