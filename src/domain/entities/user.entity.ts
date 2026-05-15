import { BadRequestError } from "../../shared/errors/app.error";
import { UniqueId } from "../valueObjects/uniqueId.vo";
import { Email } from "../valueObjects/email.vo";

export class User {
  private id: UniqueId;
  private name: string;
  private email: Email;
  private password: string;
  private role: string;
  private active: boolean;

  constructor(
    id: UniqueId,
    name: string,
    email: Email,
    password: string,
    role: string = "ADMIN",
    active: boolean = true,
  ) {
    if (!name || name.trim().length === 0) {
      throw new BadRequestError("Name is required");
    }

    if (!password || password.trim().length === 0) {
      throw new BadRequestError("Password is required");
    }

    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.active = active;
  }

  getId(): string {
    return this.id.getValue();
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email.getValue();
  }

  getPassword(): string {
    return this.password;
  }

  getRole(): string {
    return this.role;
  }

  isActive(): boolean {
    return this.active;
  }

  activate(): void {
    this.active = true;
  }

  deactivate(): void {
    this.active = false;
  }
}
