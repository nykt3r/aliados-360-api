"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonContactRepository = void 0;
const contacts_json_1 = __importDefault(require("../../data/contacts.json"));
const contact_mapper_1 = require("../../mappers/contact.mapper");
class JsonContactRepository {
    contacts;
    constructor() {
        this.contacts = contacts_json_1.default;
    }
    async save(contact) {
        const index = this.contacts.findIndex((c) => c.id === contact.getId());
        const primitive = contact_mapper_1.ContactMapper.toPersistence(contact);
        if (index >= 0) {
            this.contacts[index] = primitive;
        }
        else {
            this.contacts.push(primitive);
        }
        return contact;
    }
    async findByPartnerId(partnerId) {
        return this.contacts
            .filter((c) => c.partnerId === partnerId)
            .map(contact_mapper_1.ContactMapper.toDomain);
    }
}
exports.JsonContactRepository = JsonContactRepository;
