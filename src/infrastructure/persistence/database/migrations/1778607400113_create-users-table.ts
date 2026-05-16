import { MigrationBuilder } from "node-pg-migrate";

export const up = (pgm: MigrationBuilder): void => {
  pgm.createExtension("pgcrypto", {
    ifNotExists: true,
  });
  pgm.createType("user_role", ["ADMIN", "MANAGER", "VIEWER"]);

  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    name: {
      type: "varchar(100)",
      notNull: true,
    },

    email: {
      type: "varchar(100)",
      notNull: true,
      unique: true,
    },

    password_hash: {
      type: "text",
      notNull: true,
    },

    role: {
      type: "user_role",
      notNull: true,
      default: "VIEWER",
    },

    active: {
      type: "boolean",
      notNull: true,
      default: true,
    },

    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },

    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createIndex("users", "email", {
    unique: true,
  });
};

export const down = (pgm: MigrationBuilder): void => {
  pgm.dropTable("users");
};
