import { pool } from "../../database/postgres";
import { User } from "../../../../domain/entities/user.entity";
import { UserMapper, UserPrimitives } from "../../mappers/user.mapper";
import { IUserRepository } from "../../../../domain/interfaces/repositories/user.repository.interface";

export class PostgreUserRepository implements IUserRepository {
  async save(user: User): Promise<User | void> {
    const data = UserMapper.toPersistence(user);

    const result = await pool.query<UserPrimitives>(
      `INSERT INTO users 
            (id, name, email, passwordHash, role, active)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
      [
        data.id,
        data.name,
        data.email,
        data.passwordHash,
        data.role,
        data.active,
      ],
    );

    const row = result.rows[0];
    return UserMapper.toDomain(row);
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query<UserPrimitives>(
      `SELECT 
        id, 
        name, 
        email, 
        passwordHash, 
        role, 
        active 
        FROM users
        WHERE email = $1`,
      [email],
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return UserMapper.toDomain(row);
  }

  async findById(id: string): Promise<User | null> {
    const result = await pool.query<UserPrimitives>(
      `SELECT id, 
        name, 
        email, 
        passwordHash, 
        role, 
        active 
        FROM users
        WHERE id = $1`,
      [id],
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return UserMapper.toDomain(row);
  }

  async findAll(): Promise<User[]> {
    const result = await pool.query<UserPrimitives>(
      `SELECT 
        id,
        name,
        email,
        passwordHash,
        role,
        active
        FROM users`,
    );

    return result.rows.map((row) => UserMapper.toDomain(row));
  }
}
