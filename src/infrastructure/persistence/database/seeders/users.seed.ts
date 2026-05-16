import crypto from "node:crypto";
import { hashPassword } from "../../../../util/password.util";
import { pool } from "../postgres";

export async function usersSeed(): Promise<void> {
  const hashedPassword = await hashPassword("securepassword");

  await pool.query(
    `
      INSERT INTO users (
        id,
        name,
        email,
        password_hash,
        role,
        active
      )
      VALUES 
        ($1, $2, $3, $4, $5, $6),
        ($7, $8, $9, $10, $11, $12)
    `,
    [
      crypto.randomUUID(),
      "John Doe",
      "admin@example.com",
      hashedPassword,
      "ADMIN",
      true,

      crypto.randomUUID(),
      "Jane Doe",
      "viewer@example.com",
      hashedPassword,
      "VIEWER",
      true,
    ],
  );

  console.log("Users seed executed");
}
