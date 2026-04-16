"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const app_error_1 = require("../../shared/errors/app.error");
class Email {
    value;
    constructor(value) {
        if (!this.validate(value)) {
            throw new app_error_1.BadRequestError("Invalid email format");
        }
        this.value = value;
    }
    validate(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    getValue() {
        return this.value;
    }
}
exports.Email = Email;
