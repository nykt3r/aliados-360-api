import { GetContactsByPartnerRequestDTO, GetContactsByPartnerResponseDTO } from "../../../../application/dto/contacts/getContactsByPartner.dto";

export interface IGetContactsByPartnerUseCase {
  execute(req: GetContactsByPartnerRequestDTO): Promise<GetContactsByPartnerResponseDTO[]>;
}
