"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductMapper = void 0;
const product_entity_1 = require("../../../domain/entities/product.entity");
const uniqueId_vo_1 = require("../../../domain/valueObjects/uniqueId.vo");
class ProductMapper {
    static toDomain(data) {
        return new product_entity_1.Product(new uniqueId_vo_1.UniqueId(data.id), data.name, new uniqueId_vo_1.UniqueId(data.brandId), data.active);
    }
    static toPersistence(product) {
        return {
            id: product.getId(),
            name: product.getName(),
            brandId: product.getBrandId(),
            active: product.isActive()
        };
    }
}
exports.ProductMapper = ProductMapper;
