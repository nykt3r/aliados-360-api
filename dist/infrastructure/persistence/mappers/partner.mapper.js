"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerMapper = void 0;
const partner_entity_1 = require("../../../domain/entities/partner.entity");
const uniqueId_vo_1 = require("../../../domain/valueObjects/uniqueId.vo");
class PartnerMapper {
    static toDomain(data) {
        return new partner_entity_1.Partner(new uniqueId_vo_1.UniqueId(data.id), data.name, data.active);
    }
    static toPersistence(partner) {
        return {
            id: partner.getId(),
            name: partner.getName(),
            active: partner.isActive()
        };
    }
}
exports.PartnerMapper = PartnerMapper;
