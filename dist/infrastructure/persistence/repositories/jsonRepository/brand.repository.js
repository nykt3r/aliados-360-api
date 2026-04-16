"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonBrandRepository = void 0;
const brands_json_1 = __importDefault(require("../../data/brands.json"));
const brand_mapper_1 = require("../../mappers/brand.mapper");
class JsonBrandRepository {
    brands;
    constructor() {
        this.brands = brands_json_1.default;
    }
    async save(brand) {
        const index = this.brands.findIndex((b) => b.id === brand.getId());
        const primitive = brand_mapper_1.BrandMapper.toPersistence(brand);
        if (index >= 0) {
            this.brands[index] = primitive;
        }
        else {
            this.brands.push(primitive);
        }
        return brand;
    }
    async findByPartnerId(partnerId) {
        return this.brands
            .filter((b) => b.partnerId === partnerId)
            .map(brand_mapper_1.BrandMapper.toDomain);
    }
    async findById(id) {
        const found = this.brands.find((b) => b.id === id);
        return found ? brand_mapper_1.BrandMapper.toDomain(found) : null;
    }
}
exports.JsonBrandRepository = JsonBrandRepository;
