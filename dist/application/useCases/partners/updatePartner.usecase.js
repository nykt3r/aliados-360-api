"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePartner = void 0;
const partner_not_found_error_1 = require("../../../domain/errors/partner.not.found.error");
const partner_entity_1 = require("../../../domain/entities/partner.entity");
const uniqueId_vo_1 = require("../../../domain/valueObjects/uniqueId.vo");
const app_error_1 = require("../../../shared/errors/app.error");
class UpdatePartner {
    partnerRepository;
    constructor(partnerRepository) {
        this.partnerRepository = partnerRepository;
    }
    async execute(request) {
        const partner = await this.findPartnerOrFail(request.id);
        this.validateRequest(request);
        const updatedPartner = this.buildUpdatedPartner(partner, request);
        await this.partnerRepository.update(updatedPartner);
        return updatedPartner;
    }
    async findPartnerOrFail(id) {
        const partner = await this.partnerRepository.findById(id);
        if (!partner) {
            throw new partner_not_found_error_1.PartnerNotFoundError();
        }
        return partner;
    }
    validateRequest(request) {
        if (request.name === undefined && request.active === undefined) {
            throw new app_error_1.BadRequestError("At least one field must be provided to update");
        }
        if (request.name !== undefined) {
            this.validateName(request.name);
        }
        if (request.active !== undefined) {
            this.validateActive(request.active);
        }
    }
    validateName(name) {
        if (typeof name !== "string") {
            throw new app_error_1.BadRequestError("Name must be a string");
        }
        const trimmed = name.trim();
        if (!trimmed) {
            throw new app_error_1.BadRequestError("Name cannot be empty");
        }
        if (trimmed.length < 3) {
            throw new app_error_1.BadRequestError("Name must be at least 3 characters");
        }
    }
    validateActive(active) {
        if (typeof active !== "boolean") {
            throw new app_error_1.BadRequestError("Active must be a boolean");
        }
    }
    buildUpdatedPartner(existing, request) {
        return new partner_entity_1.Partner(new uniqueId_vo_1.UniqueId(existing.getId()), request.name ?? existing.getName(), request.active ?? existing.isActive());
    }
}
exports.UpdatePartner = UpdatePartner;
