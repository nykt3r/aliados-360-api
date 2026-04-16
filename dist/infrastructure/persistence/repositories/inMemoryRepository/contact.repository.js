"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryContactRepository = void 0;
class InMemoryContactRepository {
    contacts = [];
    async save(contact) {
        this.contacts.push(contact);
    }
    async findByPartnerId(partnerId) {
        return this.contacts.filter((c) => c.getPartnerId() === partnerId);
    }
}
exports.InMemoryContactRepository = InMemoryContactRepository;
