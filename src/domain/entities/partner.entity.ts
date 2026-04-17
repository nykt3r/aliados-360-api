import { InvalidPartnerNameError } from "../errors/invalid.partner.name.error"; // Review and refactor errors by layer -- Using diferent error (Entities should use generic)
import { UniqueId } from "../valueObjects/uniqueId.vo";

export class Partner { // Readonly props
  private id: UniqueId;
  private name: string;
  private active: boolean;

  constructor(id: UniqueId, name: string, active: boolean = true) {
    if (!name || name.trim().length === 0) { // Encapsulate validation
      throw new InvalidPartnerNameError();
    }

    this.id = id;
    this.name = name;
    this.active = active;
  }

  getId(): string {
    return this.id.getValue();
  }

  getName(): string {
    return this.name;
  }

  isActive(): boolean {
    return this.active;
  }

  deactivate() { // Implicit return: void
    this.active = false;
  }

  activate() {
    this.active = true;
  }
}
