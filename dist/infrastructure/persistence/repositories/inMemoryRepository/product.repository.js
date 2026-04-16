"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryProductRepository = void 0;
class InMemoryProductRepository {
    products = [];
    async save(product) {
        this.products.push(product);
    }
    async findById(id) {
        const product = this.products.find((p) => p.getId() === id);
        return product || null;
    }
    async findByBrandId(brandId) {
        return this.products.filter((p) => p.getBrandId() === brandId);
    }
}
exports.InMemoryProductRepository = InMemoryProductRepository;
