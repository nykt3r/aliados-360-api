import { GetPartnerByIdRequestDTO, GetPartnerByIdResponseDTO } from "../../../../application/dto/partners/getPartnerById.dto";

export interface IGetPartnerByIdUseCase {
    execute(req: GetPartnerByIdRequestDTO): Promise<GetPartnerByIdResponseDTO>
}
