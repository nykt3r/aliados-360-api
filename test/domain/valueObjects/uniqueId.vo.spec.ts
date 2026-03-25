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
    const idValue = "my-custom-id";

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
    const idValue = "12345";

    const uniqueId = new UniqueId(idValue);

    expect(uniqueId.getValue()).toBe(idValue);
  });
});