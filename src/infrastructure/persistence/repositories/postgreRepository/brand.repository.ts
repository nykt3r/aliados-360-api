import { pool } from "../../database/postgres";
import { Brand } from "../../../../domain/entities/brand.entity";
import { BrandMapper, BrandPrimitives } from "../../mappers/brand.mapper";
import { IBrandRepository } from "../../../../domain/interfaces/repositories/brand.repository.interface";

export class PostgreBrandRepository implements IBrandRepository {
  async save(brand: Brand): Promise<Brand | void> {
    const data = BrandMapper.toPersistence(brand);

    const result = await pool.query<BrandPrimitives>(
      `INSERT INTO brands 
        (id, name, "partnerId", active)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
      [data.id, data.name, data.partnerId, data.active],
    );

    const row = result.rows[0];
    return BrandMapper.toDomain(row);
  }

  async findByPartnerId(partnerId: string): Promise<Brand[]> {
    const result = await pool.query<BrandPrimitives>(
      `SELECT
        id,
        name,
        "partnerId",
        active
        FROM brands
        WHERE "partnerId" = $1`,
      [partnerId],
    );

    return result.rows.map((row) => BrandMapper.toDomain(row));
  }

  async findById(id: string): Promise<Brand | null> {
    const result = await pool.query<BrandPrimitives>(
      `SELECT * FROM brands
       WHERE id = $1`,
      [id],
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return BrandMapper.toDomain(row);
  }
}
