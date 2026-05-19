import { randomUUID } from "node:crypto";

type UUID = `${string}-${string}-${string}-${string}-${string}`;

export class UniqueId {
  private readonly value: UUID;

  constructor(value?: UUID) {
    this.value = value ?? randomUUID();
  }

  getValue(): UUID {
    return this.value;
  }
}
