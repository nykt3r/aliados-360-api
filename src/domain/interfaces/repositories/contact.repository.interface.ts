import { Contact } from "../../entities/contact.entity";

export interface IContactRepository {
  save(contact: Contact): Promise<Contact | void>;
  findByPartnerId(partnerId: string): Promise<Contact[]>;
}
