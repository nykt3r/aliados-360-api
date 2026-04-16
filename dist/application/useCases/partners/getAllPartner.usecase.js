"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllPartners = void 0;
class GetAllPartners {
    partnerRepository;
    constructor(partnerRepository) {
        this.partnerRepository = partnerRepository;
    }
    async execute() {
        return this.partnerRepository.findAll();
    }
}
exports.GetAllPartners = GetAllPartners;
