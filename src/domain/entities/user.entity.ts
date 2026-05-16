import { BadRequestError } from "../../shared/errors/app.error";
import { UniqueId } from "../valueObjects/uniqueId.vo";
import { Email } from "../valueObjects/email.vo";
import { UserRole } from "../enums/userRole.enum";

export class User {
  private id: UniqueId;
  private name: string;
  private email: Email;
  private passwordHash: string;
  private role: UserRole;
  private active: boolean;

  constructor(
    id: UniqueId,
    name: string,
    email: Email,
    passwordHash: string,
    role: UserRole = UserRole.VIEWER,
    active: boolean = true,
  ) {
    if (!name || name.trim().length === 0) {
      throw new BadRequestError("Name is required");
    }

    if (!passwordHash || passwordHash.trim().length === 0) {
      throw new BadRequestError("Password is required");
    }

    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
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

  getPasswordHash(): string {
    return this.passwordHash;
  }

  getRole(): UserRole {
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
