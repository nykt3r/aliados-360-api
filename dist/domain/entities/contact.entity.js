"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const app_error_1 = require("../../shared/errors/app.error");
class Contact {
    id;
    name;
    email;
    role;
    partnerId;
    constructor(id, name, email, role, partnerId) {
        if (!name || name.trim().length === 0) {
            throw new app_error_1.BadRequestError("Contact name is required");
        }
        if (!role || role.trim().length === 0) {
            throw new app_error_1.BadRequestError("Contact role is required");
        }
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.partnerId = partnerId;
    }
    getId() {
        return this.id.getValue();
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email.getValue();
    }
    getRole() {
        return this.role;
    }
    getPartnerId() {
        return this.partnerId.getValue();
    }
}
exports.Contact = Contact;
