"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonPartnerRepository = void 0;
const partners_json_1 = __importDefault(require("../../data/partners.json"));
const partner_not_found_error_1 = require("../../../../domain/errors/partner.not.found.error");
const partner_mapper_1 = require("../../mappers/partner.mapper");
class JsonPartnerRepository {
    partners;
    constructor() {
        this.partners = partners_json_1.default;
    }
    async save(partner) {
        const index = this.partners.findIndex((p) => p.id === partner.getId());
        const primitive = partner_mapper_1.PartnerMapper.toPersistence(partner);
        if (index >= 0) {
            this.partners[index] = primitive;
        }
        else {
            this.partners.push(primitive);
        }
        return partner;
    }
    async findById(id) {
        const found = this.partners.find((p) => p.id === id);
        if (found != null) {
            return partner_mapper_1.PartnerMapper.toDomain(found);
        }
        return null;
    }
    async findAll() {
        return this.partners.map(partner_mapper_1.PartnerMapper.toDomain);
    }
    async update(partner) {
        const index = this.partners.findIndex((p) => p.id === partner.getId());
        if (index === -1) {
            throw new partner_not_found_error_1.PartnerNotFoundError();
        }
        const primitive = partner_mapper_1.PartnerMapper.toPersistence(partner);
        this.partners[index] = primitive;
        return partner;
    }
}
exports.JsonPartnerRepository = JsonPartnerRepository;
