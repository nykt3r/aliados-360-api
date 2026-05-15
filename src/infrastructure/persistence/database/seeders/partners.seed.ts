import { pool } from "../postgres";

export async function partnersSeed(): Promise<void> {
  await pool.query(`
    INSERT INTO partners (id, name, active)
    VALUES
      ('11111111-1111-1111-1111-111111111111', 'Microsoft', true),
      ('22222222-2222-2222-2222-222222222222', 'Google', true),
      ('33333333-3333-3333-3333-333333333333', 'Anthropic', true),
      ('44444444-4444-4444-4444-444444444444', 'Apple', true),
      ('55555555-5555-5555-5555-555555555555', 'Fender', true)
      ON CONFLICT (id) DO NOTHING;
  `);

  console.log("Partners seed executed");
}
