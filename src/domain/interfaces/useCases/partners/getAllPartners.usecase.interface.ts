import { GetAllPartnersResponseDTO } from "../../../../application/dto/partners/getAllPartners.dto";

export interface IGetAllPartnersUseCase {
    execute(): Promise<GetAllPartnersResponseDTO[]>
}
