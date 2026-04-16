"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryPartnerRepository = void 0;
const partner_not_found_error_1 = require("../../../../domain/errors/partner.not.found.error");
class InMemoryPartnerRepository {
    partners = [];
    async save(partner) {
        const index = this.partners.findIndex((p) => p.getId() === partner.getId());
        if (index >= 0) {
            this.partners[index] = partner;
        }
        else {
            this.partners.push(partner);
        }
        return partner;
    }
    async findById(id) {
        const partner = this.partners.find((p) => p.getId() === id);
        return partner || null;
    }
    async findAll() {
        return [...this.partners];
    }
    async update(partner) {
        const index = this.partners.findIndex((p) => p.getId() === partner.getId());
        if (index === -1) {
            throw new partner_not_found_error_1.PartnerNotFoundError();
        }
        this.partners[index] = partner;
        return partner;
    }
}
exports.InMemoryPartnerRepository = InMemoryPartnerRepository;
