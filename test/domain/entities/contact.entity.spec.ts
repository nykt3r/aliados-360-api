import { describe, expect, it } from "vitest";
import { Contact } from "../../../src/domain/entities/contact.entity";
import { UniqueId } from "../../../src/domain/valueObjects/uniqueId.vo";
import { Email } from "../../../src/domain/valueObjects/email.vo";

describe("Contact entity", () => {
  it("should create a contact with valid data", () => {
    const id = new UniqueId();
    const name = "Ana Smith";
    const email = new Email('ana-techlead@email.com')
    const role = 'Sales Manager'
    const partnerId = new UniqueId();
    const contact = new Contact(id, name, email, role, partnerId);

    expect(contact).toBeDefined();
    expect(contact.getId()).toBe(id.getValue());
    expect(contact.getName()).toBe("Ana Smith");
    expect(contact.getEmail()).toBe(email.getValue());
    expect(contact.getRole()).toBe("Sales Manager");
    expect(contact.getPartnerId()).toBe(partnerId.getValue());    
  });

  it("should throw an error if name is empty", () => {
    expect(() => {
        new Contact(
            new UniqueId(),
            "",
            new Email("valid@mail.com"),
            "valid role",
            new UniqueId()
        );
    }).toThrow("Contact name is required");
  });

  it("should throw an error if name contains only spaces", () => {
    expect(() => {
        new Contact(
            new UniqueId(),
            "    ",
            new Email("valid@mail.com"),
            "valid role",
            new UniqueId()
        );
    }).toThrow("Contact name is required");
  });

  it("should throw an error if role is empty", () => {
    expect(() => {
        new Contact(
            new UniqueId(),
            "valid name",
            new Email("valid@mail.com"),
            "",
            new UniqueId()
        );
    }).toThrow("Contact role is required");
  });

  it("should throw an error if role contains only spaces", () => {
    expect(() => {
        new Contact(
            new UniqueId(),
            "valid name",
            new Email("valid@mail.com"),
            "    ",
            new UniqueId()
        );
    }).toThrow("Contact role is required");
  });

});
