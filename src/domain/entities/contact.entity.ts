import { UniqueId } from "../valueObjects/uniqueId.vo";
import { Email } from "../valueObjects/email.vo";

export class Contact {
  private id: UniqueId;
  private name: string;
  private email: Email;
  private role: string;
  private partnerId: UniqueId;

  constructor(
    id: UniqueId,
    name: string,
    email: Email,
    role: string,
    partnerId: UniqueId,
  ) {
    if (!name || name.trim().length === 0) {
      throw new Error("Contact name is required");
    }

    if (!role || role.trim().length === 0) {
      throw new Error("Contact role is required");
    }

    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.partnerId = partnerId;
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

  getRole(): string {
    return this.role;
  }

  getPartnerId(): string {
    return this.partnerId.getValue();
  }
}
