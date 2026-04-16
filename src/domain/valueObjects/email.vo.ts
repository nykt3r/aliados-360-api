import { BadRequestError } from "../../shared/errors/app.error";

export class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new BadRequestError("Invalid email format");
    }

    this.value = value;
  }

  private validate(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  public getValue(): string {
    return this.value;
  }
}
