"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandMapper = void 0;
const brand_entity_1 = require("../../../domain/entities/brand.entity");
const uniqueId_vo_1 = require("../../../domain/valueObjects/uniqueId.vo");
class BrandMapper {
    static toDomain(data) {
        return new brand_entity_1.Brand(new uniqueId_vo_1.UniqueId(data.id), data.name, new uniqueId_vo_1.UniqueId(data.partnerId), data.active);
    }
    static toPersistence(brand) {
        return {
            id: brand.getId(),
            name: brand.getName(),
            partnerId: brand.getPartnerId(),
            active: brand.isActive()
        };
    }
}
exports.BrandMapper = BrandMapper;
