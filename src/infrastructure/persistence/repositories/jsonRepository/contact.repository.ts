import contactsData from "../../data/contacts.json"
import { Contact } from "../../../../domain/entities/contact.entity"
import { IContactRepository } from "../../../../domain/repositories/contact.repository"
import { ContactMapper, ContactPrimitives } from "../../mappers/contact.mapper"

export class JsonContactRepository implements IContactRepository {
  private contacts: ContactPrimitives[]

  constructor() {
    this.contacts = contactsData as ContactPrimitives[]
  }

  async save(contact: Contact): Promise<Contact> {
    const index = this.contacts.findIndex((c) => c.id === contact.getId())
    const primitive = ContactMapper.toPersistence(contact)

    if (index >= 0) {
      this.contacts[index] = primitive
    } else {
      this.contacts.push(primitive)
    }
    return contact
  }

  async findByPartnerId(partnerId: string): Promise<Contact[]> {
      return this.contacts
        .filter((c) => c.partnerId === partnerId)
        .map(ContactMapper.toDomain)
    }

}
