import { BadRequestError } from "../../shared/errors/app.error";
import { UniqueId } from "../valueObjects/uniqueId.vo";

export class Partner { // Readonly props
  private id: UniqueId;
  private name: string;
  private active: boolean;

  constructor(id: UniqueId, name: string, active: boolean = true) {
    if (!name || name.trim().length === 0) { // Encapsulate validation
      throw new BadRequestError("Partner name is required");
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

  deactivate(): void {
    this.active = false;
  }

  activate(): void {
    this.active = true;
  }
}
