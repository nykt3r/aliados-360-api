import { Contact } from "../../../../domain/entities/contact.entity";
import { IContactRepository } from "../../../../domain/repositories/contact.repository";

export class InMemoryContactRepository implements IContactRepository {
  private contacts: Contact[] = [];

  async save(contact: Contact): Promise<void> {
    this.contacts.push(contact);
  }

  async findByPartnerId(partnerId: string): Promise<Contact[]> {
    return this.contacts.filter((c) => c.getPartnerId() === partnerId);
  }
}
