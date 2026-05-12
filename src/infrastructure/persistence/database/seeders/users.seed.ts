import crypto from "node:crypto";
import { hashPassword } from "../../../../util/password.util";
import { pool } from "../postgres";

export async function usersSeed(): Promise<void> {
  const hashedPassword = await hashPassword(
    "securepassword"
  );

  await pool.query(
    `
      INSERT INTO users (
        id,
        name,
        email,
        password,
        role,
        active
      )
      VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [
      crypto.randomUUID(),
      "John Doe",
      "john@example.com",
      hashedPassword,
      "ADMIN",
      true,
    ]
  );

  console.log("Users seed executed");
}
