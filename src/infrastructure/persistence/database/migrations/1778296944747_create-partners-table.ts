import { MigrationBuilder } from "node-pg-migrate";

export const up = (pgm: MigrationBuilder): void => {
  pgm.createExtension("pgcrypto", {
    ifNotExists: true,
  });

  pgm.createTable("partners", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    name: {
      type: "varchar(50)",
      notNull: true,
    },
    active: {
      type: "boolean",
      notNull: true,
      default: true,
    },
    created_at: {
      type: "timestamp",
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      default: pgm.func("current_timestamp"),
    },
  });
};

export const down = (pgm: MigrationBuilder): void => {
  pgm.dropTable("partners");
};