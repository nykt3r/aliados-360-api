import { CreateContactRequestDTO, CreateContactResponseDTO } from "../../../../application/dto/contacts/createContact.dto";

export interface ICreateContactUseCase {
  execute(req: CreateContactRequestDTO): Promise<CreateContactResponseDTO>;
}
