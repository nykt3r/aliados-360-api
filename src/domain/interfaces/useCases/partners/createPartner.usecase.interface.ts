import { CreatePartnerRequestDTO, CreatePartnerResponseDTO } from "../../../../application/dto/partners/createPartner.dto";

export interface ICreatePartnerUseCase {
    execute(req: CreatePartnerRequestDTO): Promise<CreatePartnerResponseDTO>
}
