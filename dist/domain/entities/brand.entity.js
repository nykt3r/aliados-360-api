"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = void 0;
const app_error_1 = require("../../shared/errors/app.error");
class Brand {
    id;
    name;
    partnerId;
    active;
    constructor(id, name, partnerId, active = true) {
        if (!name || name.trim().length === 0) {
            throw new app_error_1.BadRequestError("Brand name is required");
        }
        this.id = id;
        this.name = name;
        this.partnerId = partnerId;
        this.active = active;
    }
    getId() {
        return this.id.getValue();
    }
    getName() {
        return this.name;
    }
    getPartnerId() {
        return this.partnerId.getValue();
    }
    isActive() {
        return this.active;
    }
    deactivate() {
        this.active = false;
    }
}
exports.Brand = Brand;
