import { describe, expect, it } from "vitest";
import { Email } from "../../../src/domain/valueObjects/email.vo";

describe("Email Value Object", () => {
  it("should create a valid email", () => {
    const emailAddress = "test@example.com";

    const email = new Email(emailAddress);

    expect(email).toBeDefined();
    expect(email.getValue()).toBe("test@example.com");
  });

  it("should accept a valid email with subdomain", () => {
    const emailAddress = "user@mail.example.com";

    const email = new Email(emailAddress);

    expect(email.getValue()).toBe("user@mail.example.com");
  });

  it("should accept a valid email with numbers", () => {
    const emailAddress = "user123@example.com";

    const email = new Email(emailAddress);

    expect(email.getValue()).toBe("user123@example.com");
  });

  it("should throw an error for an invalid email", () => {
    const emailAddress = "invalid-email";

    const act = () => new Email(emailAddress);

    expect(act).toThrow("Invalid email format");
  });

  it("should throw an error if email does not contain @", () => {
    const emailAddress = "testexample.com";

    const act = () => new Email(emailAddress);

    expect(act).toThrow("Invalid email format");
  });

  it("should throw an error if email has spaces", () => {
    const emailAddress = "test @example.com";

    const act = () => new Email(emailAddress);

    expect(act).toThrow("Invalid email format");
  });

  it("should throw an error if email has no domain", () => {
    const emailAddress = "test@";

    const act = () => new Email(emailAddress);

    expect(act).toThrow("Invalid email format");
  });

  it("should throw an error if email has no local part", () => {
    const emailAddress = "@example.com";

    const act = () => new Email(emailAddress);

    expect(act).toThrow("Invalid email format");
  });
});