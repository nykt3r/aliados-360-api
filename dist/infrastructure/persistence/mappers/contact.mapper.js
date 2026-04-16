"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactMapper = void 0;
const contact_entity_1 = require("../../../domain/entities/contact.entity");
const uniqueId_vo_1 = require("../../../domain/valueObjects/uniqueId.vo");
const email_vo_1 = require("../../../domain/valueObjects/email.vo");
class ContactMapper {
    static toDomain(data) {
        return new contact_entity_1.Contact(new uniqueId_vo_1.UniqueId(data.id), data.name, new email_vo_1.Email(data.email), data.role, new uniqueId_vo_1.UniqueId(data.partnerId));
    }
    static toPersistence(contact) {
        return {
            id: contact.getId(),
            name: contact.getName(),
            email: contact.getEmail(),
            role: contact.getRole(),
            partnerId: contact.getPartnerId()
        };
    }
}
exports.ContactMapper = ContactMapper;
