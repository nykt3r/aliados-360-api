"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerNotFoundError = void 0;
const app_error_1 = require("../../shared/errors/app.error");
class PartnerNotFoundError extends app_error_1.NotFoundError {
    constructor() {
        super("Partner not found");
        this.name = "PartnerNotFoundError";
    }
}
exports.PartnerNotFoundError = PartnerNotFoundError;
