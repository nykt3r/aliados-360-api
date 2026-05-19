import { describe, expect, it } from "vitest";
import { UniqueId } from "../../../src/domain/valueObjects/uniqueId.vo";

describe("UniqueId Value Object", () => {
  it("should generate a unique id if no value is provided", () => {
    const uniqueId = new UniqueId();

    const value = uniqueId.getValue();

    expect(uniqueId).toBeDefined();
    expect(value).toBeTypeOf("string");
    expect(value.length).toBeGreaterThan(0);
  });

  it("should keep the provided id value", () => {
    const idValue = "550e8400-e29b-41d4-a716-446655440001";

    const uniqueId = new UniqueId(idValue);

    expect(uniqueId.getValue()).toBe(idValue);
  });

  it("should generate different ids for different instances", () => {
    const firstUniqueId = new UniqueId();
    const secondUniqueId = new UniqueId();

    const firstValue = firstUniqueId.getValue();
    const secondValue = secondUniqueId.getValue();

    expect(firstValue).not.toBe(secondValue);
  });

  it("should return the stored value", () => {
    const idValue = "550e8400-e29b-41d4-a716-446655440001";

    const uniqueId = new UniqueId(idValue);

    expect(uniqueId.getValue()).toBe(idValue);
  });

  it("should throw an error if provided value is not a valid UUID", () => {
    const invalidIdValue = "invalid-id-format";

    expect(() => new UniqueId(invalidIdValue)).toThrow("Invalid UUID format");
  });

});