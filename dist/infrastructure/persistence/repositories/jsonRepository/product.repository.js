"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonProductRepository = void 0;
const products_json_1 = __importDefault(require("../../data/products.json"));
const product_mapper_1 = require("../../mappers/product.mapper");
class JsonProductRepository {
    products;
    constructor() {
        this.products = products_json_1.default;
    }
    async save(product) {
        const index = this.products.findIndex((p) => p.id === product.getId());
        const primitive = product_mapper_1.ProductMapper.toPersistence(product);
        if (index >= 0) {
            this.products[index] = primitive;
        }
        else {
            this.products.push(primitive);
        }
        return product;
    }
    async findByBrandId(brandId) {
        return this.products
            .filter((p) => p.brandId === brandId)
            .map(product_mapper_1.ProductMapper.toDomain);
    }
    async findById(id) {
        const found = this.products.find((p) => p.id === id);
        return found ? product_mapper_1.ProductMapper.toDomain(found) : null;
    }
}
exports.JsonProductRepository = JsonProductRepository;
