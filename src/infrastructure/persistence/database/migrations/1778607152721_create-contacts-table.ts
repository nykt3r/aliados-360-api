import { MigrationBuilder } from "node-pg-migrate";

export const up = (pgm: MigrationBuilder): void => {
  pgm.createExtension("pgcrypto", {
    ifNotExists: true,
  });

  pgm.createTable("contacts", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    name: {
      type: "varchar(50)",
      notNull: true,
    },

    email: {
      type: "varchar(100)",
      notNull: true,
      unique: true,
    },

    role: {
      type: "varchar(50)",
      notNull: true,
    },

    partnerId: {
      type: "uuid",
      notNull: true,
      references: "partners(id)",
      onDelete: "RESTRICT",
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

  pgm.createIndex("contacts", "partnerId");
  pgm.createIndex("contacts", "email");
  pgm.addConstraint("contacts", "contacts_email_unique", {
    unique: ["email"],
  });
};

export const down = (pgm: MigrationBuilder): void => {
  pgm.dropTable("contacts");
};
