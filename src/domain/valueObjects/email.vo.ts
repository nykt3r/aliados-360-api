import { BadRequestError } from "../../shared/errors/app.error"; // Review and refactor errors by layer

export class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!this.validate(value)) { // Encapsulate 
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
