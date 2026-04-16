"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPartnerNameError = void 0;
const app_error_1 = require("../../shared/errors/app.error");
class InvalidPartnerNameError extends app_error_1.BadRequestError {
    constructor() {
        super("Partner name is required");
        this.name = "InvalidPartnerNameError";
    }
}
exports.InvalidPartnerNameError = InvalidPartnerNameError;
