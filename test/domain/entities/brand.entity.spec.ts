import { describe, expect, it } from "vitest";
import { Brand } from "../../../src/domain/entities/brand.entity";
import { UniqueId } from "../../../src/domain/valueObjects/uniqueId.vo";

describe("Brand entity", () => {
  it("should create a brand with valid data", () => {
    const id = new UniqueId();
    const name = "Azure";
    const partnerId = new UniqueId();
    const brand = new Brand(id, name, partnerId);

    expect(brand).toBeDefined();
    expect(brand.getId()).toBe(id.getValue());
    expect(brand.getName()).toBe("Azure");
    expect(brand.getPartnerId()).toBe(partnerId.getValue());
    expect(brand.isActive()).toBe(true);
  });

  it("should be active by default", () => {
    const brand = new Brand(
        new UniqueId(), 
        "Azure", 
        new UniqueId()
    );

    expect(brand.isActive()).toBe(true);
  });

  it("should throw an error if name is empty", () => {
    expect(() => { 
        new Brand(
            new UniqueId(), 
            "", 
            new UniqueId()
        );
    }).toThrow("Brand name is required");
  });

  it("should throw an error if name contains only spaces", () => {
    expect(() => {
        new Brand(
            new UniqueId(), 
            "   ", 
            new UniqueId()
        );
    }).toThrow("Brand name is required");
  });

  it("should deactivate the brand", () => {
    const brand = new Brand(new UniqueId(), "Azure", new UniqueId());

    brand.deactivate();

    expect(brand.isActive()).toBe(false);
  });
});
