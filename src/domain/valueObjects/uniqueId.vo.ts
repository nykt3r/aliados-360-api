import { randomUUID } from "node:crypto";
import { BadRequestError } from "../../shared/errors/app.error";

type UUID = `${string}-${string}-${string}-${string}-${string}`;

export class UniqueId {
  private readonly value: UUID;

  constructor(value?: string) {
    if (value && !this.isValidUUID(value)) {
      throw new BadRequestError("Invalid UUID format");
    }

    this.value = (value ?? randomUUID()) as UUID;
  }

  getValue(): string {
    return this.value;
  }

  private isValidUUID(value: string): value is UUID {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      value,
    );
  }
}
