import { ICreateContactUseCase } from "../../../domain/interfaces/useCases/contacts/createContact.usecase.interface";
import { IContactRepository } from "../../../domain/interfaces/repositories/contact.repository.interface";
import { IPartnerRepository } from "../../../domain/interfaces/repositories/partner.repository.interface";
import {
  CreateContactRequestDTO,
  CreateContactResponseDTO,
} from "../../dto/contacts/createContact.dto";
import { UniqueId } from "../../../domain/valueObjects/uniqueId.vo";
import { Email } from "../../../domain/valueObjects/email.vo";
import { Contact } from "../../../domain/entities/contact.entity";
import {
  AppError,
  BadRequestError,
  NotFoundError,
} from "../../../shared/errors/app.error";

export class CreateContactUseCase implements ICreateContactUseCase {
  constructor(
    private readonly contactRepository: IContactRepository,
    private readonly partnerRepository: IPartnerRepository,
  ) {}

  async execute(req: CreateContactRequestDTO): Promise<CreateContactResponseDTO> {
    const existingPartner = await this.partnerRepository.findById(
      req.partnerId,
    );
    if (!existingPartner) throw new NotFoundError("Partner not found");

    const partnerContacts = await this.contactRepository.findByPartnerId(
      req.partnerId,
    );
    const duplicateContact = partnerContacts.find(
      (contact) => contact.getEmail().toLowerCase() === req.email.toLowerCase(),
    );
    if (duplicateContact)
      throw new BadRequestError(
        "Contact e-mail already exists for this partner",
      );

    const newUniqueId = new UniqueId(req.id);
    const contactEmail = new Email(req.email);
    const partnerId = new UniqueId(req.partnerId);
    const newContact = new Contact(
      newUniqueId,
      req.name,
      contactEmail,
      req.role,
      partnerId,
    );

    const savedContact = await this.contactRepository.save(newContact);
    if (!savedContact) throw new AppError("Error saving Contact");

    const result: CreateContactResponseDTO = {
      id: savedContact.getId(),
      name: savedContact.getName(),
      email: savedContact.getEmail(),
      role: savedContact.getRole(),
      partnerId: savedContact.getPartnerId(),
    };

    return result;
  }
}
