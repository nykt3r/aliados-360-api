"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const app_error_1 = require("../../shared/errors/app.error");
class Product {
    id;
    name;
    brandId;
    active;
    constructor(id, name, brandId, active = true) {
        if (!name || name.trim().length === 0) {
            throw new app_error_1.BadRequestError("Product name is required");
        }
        this.id = id;
        this.name = name;
        this.brandId = brandId;
        this.active = active;
    }
    getId() {
        return this.id.getValue();
    }
    getName() {
        return this.name;
    }
    getBrandId() {
        return this.brandId.getValue();
    }
    isActive() {
        return this.active;
    }
    deactivate() {
        this.active = false;
    }
}
exports.Product = Product;
