"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryBrandRepository = void 0;
class InMemoryBrandRepository {
    brands = [];
    async save(brand) {
        this.brands.push(brand);
    }
    async findById(id) {
        const brand = this.brands.find((b) => b.getId() === id);
        return brand || null;
    }
    async findByPartnerId(partnerId) {
        return this.brands.filter((b) => b.getPartnerId() === partnerId);
    }
}
exports.InMemoryBrandRepository = InMemoryBrandRepository;
