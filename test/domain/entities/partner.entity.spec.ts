import { describe, expect, it } from "vitest";
import { Partner } from "../../../src/domain/entities/partner.entity";
import { UniqueId } from "../../../src/domain/valueObjects/uniqueId.vo";
import { InvalidPartnerNameError } from "../../../src/domain/errors/invalid.partner.name.error";

describe("Partner entity", () => {
  it("should create a partner with valid data", () => {
    const id = new UniqueId();
    const name = "Ubuntu";
    const partner = new Partner(id, name);

    expect(partner).toBeDefined();
    expect(partner.getId()).toBe(id.getValue());
    expect(partner.getName()).toBe("Ubuntu");
    expect(partner.isActive()).toBe(true);
  });

  it("should be active by default", () => {
    const id = new UniqueId();
    const partner = new Partner(id, "Ubuntu");

    expect(partner.isActive()).toBe(true);
  });

  it("should throw InvalidPartnerNameError if name is empty", () => {
    expect(() => {
      new Partner(new UniqueId(), "");
    }).toThrow(InvalidPartnerNameError);
  });

  it("should throw InvalidPartnerNameError if name contains only spaces", () => {
    expect(() => {
      new Partner(new UniqueId(), "   ");
    }).toThrow(InvalidPartnerNameError);
  });

  it("should deactivate the partner", () => {
    const partner = new Partner(new UniqueId(), "Ubuntu", true);

    partner.deactivate();

    expect(partner.isActive()).toBe(false);
  });

  it("should activate the partner", () => {
    const partner = new Partner(new UniqueId(), "Ubuntu", false);

    partner.activate();

    expect(partner.isActive()).toBe(true);
  });

  it("should activate a partner after being deactivated", () => {
    const partner = new Partner(new UniqueId(), "Ubuntu", true);

    partner.deactivate();
    expect(partner.isActive()).toBe(false);

    partner.activate();
    expect(partner.isActive()).toBe(true);
  });
});
