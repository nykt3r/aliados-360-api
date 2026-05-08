import { Pool } from "pg";
import { env } from "../../../config/env";

export const pool = new Pool({
  connectionString: env.dataBase.url,
  ssl: {
    rejectUnauthorized: false
  }
});

export const connectDatabase = async (): Promise<void> => {
  try {
    await pool.query("SELECT 1");
    console.info("✅ PostgreSQL connected");
  } catch (error) {
    console.error("❌ Database connection failed", error);
    process.exit(1);
  }
};

export const closeDatabase = async (): Promise<void> => {
  await pool.end();
};
