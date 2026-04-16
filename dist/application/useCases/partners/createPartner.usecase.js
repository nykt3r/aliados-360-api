"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePartner = void 0;
const partner_entity_1 = require("../../../domain/entities/partner.entity");
const uniqueId_vo_1 = require("../../../domain/valueObjects/uniqueId.vo");
class CreatePartner {
    partnerRepository;
    constructor(partnerRepository) {
        this.partnerRepository = partnerRepository;
    }
    async execute(request) {
        const partner = new partner_entity_1.Partner(new uniqueId_vo_1.UniqueId(), request.name);
        await this.partnerRepository.save(partner);
        return partner;
    }
}
exports.CreatePartner = CreatePartner;
