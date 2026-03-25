import { it, describe, expect } from "vitest";
import { Partner } from "../../../src/domain/entities/partner.entity";
import { UniqueId } from "../../../src/domain/valueObjects/uniqueId.vo";

describe("Partner", () => {
  it("should return a generic entity", () => {
    const firstPartner = {
      id: new UniqueId(),
      name: "ubuntu",
      active: true,
    };

    const genericPartner = new Partner(
      firstPartner.id,
      firstPartner.name,
      firstPartner.active,
    );
    expect(genericPartner).toBeDefined();
  });

  it("should throw an error if name is empty",() => {
    const firstPartner = {
        id: new UniqueId(),
        name: "",
        active: true,
    };
    expect(
        () => new Partner(firstPartner.id, firstPartner.name, firstPartner.active)).toThrow(Error);
    })

    
});

