import { pool } from "../postgres";

export async function productsSeed(): Promise<void> {
  await pool.query(`
    INSERT INTO products (name, brand_id, active)
    VALUES
      ('Windows 11', '11111111-1111-1111-1111-111111111119', true),
      ('Windows 10', '11111111-1111-1111-1111-111111111119', true),
      ('Windows 8.1', '11111111-1111-1111-1111-111111111119', true),
      ('Windows 8', '11111111-1111-1111-1111-111111111119', true),
      ('Azure DevOps', '11111111-1111-1111-1111-111111111118', true),
      ('Azure Virtual Machines', '11111111-1111-1111-1111-111111111118', true),
      ('Azure AI Services', '11111111-1111-1111-1111-111111111118', true),
      ('Azure CDN', '11111111-1111-1111-1111-111111111118', true),
      ('Azure SQL Database', '11111111-1111-1111-1111-111111111118', true),
      ('Azure Files', '11111111-1111-1111-1111-111111111118', true),
      ('Azure Functions', '11111111-1111-1111-1111-111111111118', true),
      ('Azure Active Directory', '11111111-1111-1111-1111-111111111118', true),
      ('Pixel 10', '22222222-2222-2222-2222-222222222226', true),
      ('Pixel 10 Pro', '22222222-2222-2222-2222-222222222226', true),
      ('Pixel 9 Pro', '22222222-2222-2222-2222-222222222226', true),
      ('Pixel 8 Pro', '22222222-2222-2222-2222-222222222226', true),
      ('Pixel 8', '22222222-2222-2222-2222-222222222226', true),
      ('Pixel 7A', '22222222-2222-2222-2222-222222222226', true),
      ('MacBook Neo', '44444444-4444-4444-4444-444444444448', true),
      ('MacBook Air M2', '44444444-4444-4444-4444-444444444448', true),
      ('MacBook Air M3', '44444444-4444-4444-4444-444444444448', true),
      ('MacBook Pro M5 Max', '44444444-4444-4444-4444-444444444448', true),
      ('MacBook Pro M4', '44444444-4444-4444-4444-444444444448', true)
  `);

  console.log("Products seed executed");
}
