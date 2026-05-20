import { describe, expect, it } from "vitest";
import { User } from "../../../src/domain/entities/user.entity";
import { UniqueId } from "../../../src/domain/valueObjects/uniqueId.vo";
import { Email } from "../../../src/domain/valueObjects/email.vo";
import { UserRole } from "../../../src/domain/enums/userRole.enum";

describe("User entity", () => {

    //Test case: Creating a user with valid data
    it("should create a user with valid data", () => {
        const id = new UniqueId();
        const user = new User(
            id,
            "John Perez",
            new Email("john@test.com"),
            "hashedPassword123",
            UserRole.ADMIN
        );

        expect(user).toBeDefined();
        expect(user.getId()).toBe(id.getValue());
        expect(user.getName()).toBe("John Perez");
        expect(user.getEmail()).toBe("john@test.com");
        expect(user.getPasswordHash()).toBe("hashedPassword123");
        expect(user.getRole()).toBe(UserRole.ADMIN);
        expect(user.isActive()).toBe(true);
    });

    //Test case: Creating a user with default role and active status
    it("should be active by default", () => {
        const user = new User(
            new UniqueId(),
            "John Perez",
            new Email("john@test.com"),
            "hashedPassword123"
        );

        expect(user.isActive()).toBe(true);
    });

    //Test case: Creating a user with default role
    it("should assign VIEWER role by default", () => {
        const user = new User(
            new UniqueId(),
            "John Perez",
            new Email("john@test.com"),
            "hashedPassword123"
        );

        expect(user.getRole()).toBe(UserRole.VIEWER);
    });

    //Test case: Creating a user with empty name
    it("should throw an error if name is empty", () => {
        expect(() => {
            new User(
                new UniqueId(),
                "",
                new Email("john@test.com"),
                "hashedPassword123"
            );
        }).toThrow("Name is required");
    });

    //Test case: Creating a user with name containing only spaces
    it("should throw an error if name contains only spaces", () => {
        expect(() => {
            new User(
                new UniqueId(),
                "   ",
                new Email("john@test.com"),
                "hashedPassword123"
            );
        }).toThrow("Name is required");
    });

    //Test case: Creating a user with empty password
    it("should throw an error if password is empty", () => {
        expect(() => {
            new User(
                new UniqueId(),
                "John Perez",
                new Email("john@test.com"),
                ""
            );
        }).toThrow("Password is required");
    });

    //Test case: Creating a user with password containing only spaces
    it("should throw an error if password contains only spaces", () => {
        expect(() => {
            new User(
                new UniqueId(),
                "John Perez",
                new Email("john@test.com"),
                "   "
            );
        }).toThrow("Password is required");
    });

    //Test case: Deactivating a user
    it("should deactivate user", () => {
        const user = new User(
            new UniqueId(),
            "John Perez",
            new Email("john@test.com"),
            "hashedPassword123",
            UserRole.ADMIN,
            true
        );

        user.deactivate();
        expect(user.isActive()).toBe(false);
    });

    //Test case: Activating a user
    it("should activate user", () => {
        const user = new User(
            new UniqueId(),
            "John Perez",
            new Email("john@test.com"),
            "hashedPassword123",
            UserRole.ADMIN,
            false
        );

        user.activate();
        expect(user.isActive()).toBe(true);
    });

    //Test case: Activating a user after being deactivated
    it("should activate a user after being deactivated", () => {
        const user = new User(
            new UniqueId(),
            "John Perez",
            new Email("john@test.com"),
            "hashedPassword123"
        );

        user.deactivate();
        expect(user.isActive()).toBe(false);
        user.activate();
        expect(user.isActive()).toBe(true);
    });

});