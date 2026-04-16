"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Partner = void 0;
const invalid_partner_name_error_1 = require("../errors/invalid.partner.name.error");
class Partner {
    id;
    name;
    active;
    constructor(id, name, active = true) {
        if (!name || name.trim().length === 0) {
            throw new invalid_partner_name_error_1.InvalidPartnerNameError();
        }
        this.id = id;
        this.name = name;
        this.active = active;
    }
    getId() {
        return this.id.getValue();
    }
    getName() {
        return this.name;
    }
    isActive() {
        return this.active;
    }
    deactivate() {
        this.active = false;
    }
    activate() {
        this.active = true;
    }
}
exports.Partner = Partner;
