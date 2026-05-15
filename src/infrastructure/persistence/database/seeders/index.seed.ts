import { pool } from "../postgres";
import { partnersSeed } from "./partners.seed";
import { brandsSeed } from "./brands.seed";
import { productsSeed } from "./products.seed";
import { contactsSeed } from "./contacts.seed";
import { usersSeed } from "./users.seed";

async function runSeeds(): Promise<void> {
  try {
    console.log("Running seeds...");
    await partnersSeed();
    await brandsSeed();
    await productsSeed();
    await contactsSeed();
    await usersSeed();
    console.log("All seeds executed successfully!!");
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

runSeeds();
