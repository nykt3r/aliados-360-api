import { describe, expect, it } from "vitest";
import { Product } from "../../../src/domain/entities/product.entity";
import { UniqueId } from "../../../src/domain/valueObjects/uniqueId.vo";

describe("Product entity", () => {
  it("should create a product with valid data", () => {
    const id = new UniqueId();
    const name = "Azure DevOps";
    const brandId = new UniqueId();
    const product = new Product(id, name, brandId);

    expect(product).toBeDefined();
    expect(product.getId()).toBe(id.getValue());
    expect(product.getName()).toBe("Azure DevOps");
    expect(product.getBrandId()).toBe(brandId.getValue());    
    expect(product.isActive()).toBe(true);
  });

  it("should be active by default", () => {
    const product = new Product(
        new UniqueId(), 
        "Azure DevOps", 
        new UniqueId()
    );

    expect(product.isActive()).toBe(true);
  });

  it("should throw an error if name is empty", () => {
    expect(() => {
        new Product(
            new UniqueId(),
            "", 
            new UniqueId()
        );
    }).toThrow("Product name is required");
  });

  it("should throw an error if name contains only spaces", () => {
    expect(() => {
      new Product(
            new UniqueId(),
            "    ", 
            new UniqueId()
        );
    }).toThrow("Product name is required");
  });

  it("should deactivate the product", () => {
    const product = new Product(
        new UniqueId(), 
        "Azure DevOps", 
        new UniqueId()
    );

    product.deactivate();

    expect(product.isActive()).toBe(false);
  });
});
