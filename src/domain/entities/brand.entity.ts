import { UniqueId } from "../valueObjects/uniqueId.vo";

export class Brand {
  private id: UniqueId;
  private name: string;
  private partnerId: UniqueId;
  private active: boolean;

  constructor(
    id: UniqueId,
    name: string,
    partnerId: UniqueId,
    active: boolean = true,
  ) {
    if (!name || name.trim().length === 0) {
      throw new Error("Brand name is required");
    }

    this.id = id;
    this.name = name;
    this.partnerId = partnerId;
    this.active = active;
  }

  getId(): string {
    return this.id.getValue();
  }

  getName(): string {
    return this.name;
  }

  getPartnerId(): string {
    return this.partnerId.getValue();
  }

  isActive(): boolean {
    return this.active;
  }

  deactivate() {
    this.active = false;
  }
}
