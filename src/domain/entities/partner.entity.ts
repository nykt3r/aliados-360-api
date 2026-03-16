import { UniqueId } from "../valueObjects/uniqueId.vo";

export class Partner {
  private id: UniqueId;
  private name: string;
  private active: boolean;

  constructor(id: UniqueId, name: string, active: boolean = true) {
    if (!name || name.trim().length === 0) {
      throw new Error("Partner name is required");
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

  deactivate() {
    this.active = false;
  }

  activate() {
    this.active = true;
  }
}
