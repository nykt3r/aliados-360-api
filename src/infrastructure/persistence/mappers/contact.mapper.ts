import { Contact } from "../../../domain/entities/contact.entity"
import { UniqueId } from "../../../domain/valueObjects/uniqueId.vo"
import { Email } from "../../../domain/valueObjects/email.vo"

export interface ContactPrimitives {
  id: string
  name: string
  email: string
  role: string
  partnerId: string
}

export class ContactMapper {
  static toDomain(data: ContactPrimitives): Contact {
    return new Contact(
      new UniqueId(data.id),
      data.name,
      new Email(data.email),
      data.role,
      new UniqueId(data.partnerId)
    )
  }

  static toPersistence(contact: Contact): ContactPrimitives {
    return {
      id: contact.getId(),
      name: contact.getName(),
      email: contact.getEmail(),
      role: contact.getRole(),
      partnerId: contact.getPartnerId()
    }
  }
}