import { Contact } from "../entities/contact.entity";

export interface IContactRepository {
  save(contact: Contact): Promise<void>;
  findByPartnerId(partnerId: string): Promise<Contact[]>;
}
