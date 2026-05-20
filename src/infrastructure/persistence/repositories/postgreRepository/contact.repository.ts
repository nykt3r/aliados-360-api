import { pool } from "../../database/postgres";
import { Contact } from "../../../../domain/entities/contact.entity";
import { ContactMapper, ContactPrimitives } from "../../mappers/contact.mapper";
import { IContactRepository } from "../../../../domain/interfaces/repositories/contact.repository.interface";

export class PostgreContactRepository implements IContactRepository {
  async save(contact: Contact): Promise<Contact | void> {
    const data = ContactMapper.toPersistence(contact);

    const result = await pool.query<ContactPrimitives>(
      `INSERT INTO contacts 
        (id, name, email, role, "partnerId")
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
      [data.id, data.name, data.email, data.role, data.partnerId],
    );

    const row = result.rows[0];
    return ContactMapper.toDomain(row);
  }

  async findByPartnerId(partnerId: string): Promise<Contact[]> {
    const result = await pool.query<ContactPrimitives>(
      `SELECT 
        id, 
        name, 
        email, 
        role,
        "partnerId"
        FROM contacts
        WHERE "partnerId" = $1`,
      [partnerId],
    );

    return result.rows.map((row) => ContactMapper.toDomain(row));
  }
}
