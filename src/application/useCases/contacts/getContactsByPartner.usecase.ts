import { IGetContactsByPartnerUseCase } from "../../../domain/interfaces/useCases/contacts/getContactsByPartner.usecase.interface";
import { IContactRepository } from "../../../domain/interfaces/repositories/contact.repository.interface";
import { IPartnerRepository } from "../../../domain/interfaces/repositories/partner.repository.interface";
import {
  GetContactsByPartnerRequestDTO,
  GetContactsByPartnerResponseDTO,
} from "../../dto/contacts/getContactsByPartner.dto";
import { AppError, NotFoundError } from "../../../shared/errors/app.error";

export class GetContactsByPartnerUseCase implements IGetContactsByPartnerUseCase {
  constructor(
    private readonly contactRepository: IContactRepository,
    private readonly partnerRepository: IPartnerRepository,
  ) {}

  async execute(req: GetContactsByPartnerRequestDTO): Promise<GetContactsByPartnerResponseDTO[]> {
    const existingPartner = await this.partnerRepository.findById(
      req.partnerId,
    );
    if (!existingPartner) throw new NotFoundError("Partner not found");

    const contacts = await this.contactRepository.findByPartnerId(
      req.partnerId,
    );
    if (!contacts) throw new AppError("Error getting Contacts");

    const result: GetContactsByPartnerResponseDTO[] = contacts.map(
      (contact) => ({
        id: contact.getId(),
        name: contact.getName(),
        email: contact.getEmail(),
        role: contact.getRole(),
        partnerId: contact.getPartnerId(),
      }),
    );

    return result;
  }
}
