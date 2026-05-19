import { pool } from "../../database/postgres";
import { Product } from "../../../../domain/entities/product.entity";
import { ProductMapper, ProductPrimitives } from "../../mappers/product.mapper";
import { IProductRepository } from "../../../../domain/interfaces/repositories/product.repository.interface";

export class PostgreProductRepository implements IProductRepository {
  async save(product: Product): Promise<Product | void> {
    const data = ProductMapper.toPersistence(product);

    const result = await pool.query<ProductPrimitives>(
      `INSERT INTO products 
        (id, name, brandId, active)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
      [data.id, data.name, data.brandId, data.active],
    );

    const row = result.rows[0];
    return ProductMapper.toDomain(row);
  }

  async findByBrandId(brandId: string): Promise<Product[]> {
    const result = await pool.query<ProductPrimitives>(
      `SELECT
        id,
        name,
        brandId,
        active
        FROM products
        WHERE brandId = $1`,
      [brandId],
    );

    return result.rows.map((row) => ProductMapper.toDomain(row));
  }

  async findById(id: string): Promise<Product | null> {
    const result = await pool.query<ProductPrimitives>(
      `SELECT * FROM products
        WHERE id = $1`,
      [id],
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return ProductMapper.toDomain(row);
  }
}
