import { UniqueId } from "../valueObjects/uniqueId.vo";
import { BadRequestError } from "../../shared/errors/app.error"; // Review and refactor errors by layer

export class Product {
  private id: UniqueId; // Readonly props
  private name: string;
  private brandId: UniqueId;
  private active: boolean;

  constructor(
    id: UniqueId,
    name: string,
    brandId: UniqueId,
    active: boolean = true,
  ) {
    if (!name || name.trim().length === 0) { // Encapsulate validation
      throw new BadRequestError("Product name is required");
    }

    this.id = id;
    this.name = name;
    this.brandId = brandId;
    this.active = active;
  }

  getId(): string {
    return this.id.getValue();
  }

  getName(): string {
    return this.name;
  }

  getBrandId(): string {
    return this.brandId.getValue();
  }

  isActive(): boolean {
    return this.active;
  }

  deactivate() { // Implicit return: void
    this.active = false;
  }
}
