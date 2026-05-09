import { pool } from "../../database/postgres";
import { Partner } from "../../../../domain/entities/partner.entity"
import { PartnerMapper, PartnerPrimitives } from "../../mappers/partner.mapper"
import { IPartnerRepository } from "../../../../domain/interfaces/repositories/partner.repository.interface"

export class PostgrePartnerRepository implements IPartnerRepository {

    async save(partner: Partner): Promise<Partner | void> {
        const data = PartnerMapper.toPersistence(partner);

        const result = await pool.query<PartnerPrimitives>(
            `INSERT INTO partners 
            (id, name, active)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [
            data.id,
            data.name,
            data.active,
            ]
        );

        const row = result.rows[0];
        return PartnerMapper.toDomain(row);
    }

    async findById(id: string): Promise<Partner | null> {
        const result = await pool.query<PartnerPrimitives>(
            `SELECT * FROM partners
            WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) return null;

        const row = result.rows[0];
        return PartnerMapper.toDomain(row);
    }
    
    async findAll(): Promise<Partner[]> {
        const result = await pool.query<PartnerPrimitives>(
            `SELECT 
            id,
            name,
            active
            FROM partners`
        );

        return result.rows.map((row) =>
            PartnerMapper.toDomain(row)
        );
    }

    async update(partner: Partner): Promise<Partner | void> {
        const data = PartnerMapper.toPersistence(partner);

        const { rows } = await pool.query<PartnerPrimitives>(
            `UPDATE partners
            SET
            name = $2,
            active = $3
            WHERE id = $1
            RETURNING *`,
            [
                data.id,
                data.name,
                data.active,
            ]
        );

        if (rows.length === 0) throw new Error("Partner not found");

        return PartnerMapper.toDomain(rows[0]);
    }
}
