import { pool } from "../postgres";

export async function contactsSeed(): Promise<void> {
  await pool.query(`
    INSERT INTO contacts (name, email, role, partner_id)
    VALUES
      ('Osama Lin Baden', 'allahu@akbar.com', 'PM', '11111111-1111-1111-1111-111111111111'),
      ('Eric Cartman', 'mama@beach.com', 'CEO', '11111111-1111-1111-1111-111111111111'),
      ('Ayuwoki Ospina', 'hee-hee@criminal.com', 'CEO', '22222222-2222-2222-2222-222222222222'),
      ('Broco Lee', 'wakata@dragon.com', 'COO', '33333333-3333-3333-3333-333333333333'),
      ('Al Pacino', 'scar@face.com', 'Sales Manager', '44444444-4444-4444-4444-444444444444'),
      ('Alex Rosas', 'child@mine.com', 'CMO', '55555555-5555-5555-5555-555555555555')
  `);

  console.log("Contacts seed executed");
}
