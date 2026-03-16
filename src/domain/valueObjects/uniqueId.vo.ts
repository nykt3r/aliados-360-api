import { randomUUID } from "node:crypto";

export class UniqueId {
  private readonly value: string;

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  getValue(): string {
    return this.value;
  }
}
