"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPartnerById = void 0;
const partner_not_found_error_1 = require("../../../domain/errors/partner.not.found.error");
class GetPartnerById {
    partnerRepository;
    constructor(partnerRepository) {
        this.partnerRepository = partnerRepository;
    }
    async execute(request) {
        const partner = await this.partnerRepository.findById(request.id);
        return this.ensurePartnerExists(partner, request.id);
    }
    ensurePartnerExists(partner, _id) {
        if (!partner) {
            throw new partner_not_found_error_1.PartnerNotFoundError();
        }
        return partner;
    }
}
exports.GetPartnerById = GetPartnerById;
