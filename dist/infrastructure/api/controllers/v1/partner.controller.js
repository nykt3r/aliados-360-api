"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePartnerController = exports.GetAllPartnersController = exports.GetPartnerByIdController = exports.CreatePartnerController = void 0;
class CreatePartnerController {
    createPartner;
    constructor(createPartner) {
        this.createPartner = createPartner;
    }
    async handle(req, res) {
        const { name } = req.body;
        const partner = await this.createPartner.execute({
            name,
        });
        res.status(201).json({
            id: partner.getId(),
            name: partner.getName(),
            active: partner.isActive(),
        });
    }
}
exports.CreatePartnerController = CreatePartnerController;
class GetPartnerByIdController {
    getPartnerById;
    constructor(getPartnerById) {
        this.getPartnerById = getPartnerById;
    }
    async handle(req, res) {
        const { id } = req.params;
        const partner = await this.getPartnerById.execute({
            id,
        });
        res.status(200).json({
            id: partner.getId(),
            name: partner.getName(),
            active: partner.isActive(),
        });
    }
}
exports.GetPartnerByIdController = GetPartnerByIdController;
class GetAllPartnersController {
    getAllPartners;
    constructor(getAllPartners) {
        this.getAllPartners = getAllPartners;
    }
    async handle(_req, res) {
        const partners = await this.getAllPartners.execute();
        res.status(200).json(partners);
    }
}
exports.GetAllPartnersController = GetAllPartnersController;
class UpdatePartnerController {
    updatePartner;
    constructor(updatePartner) {
        this.updatePartner = updatePartner;
    }
    async handle(req, res) {
        const { id } = req.params;
        const { name, active } = req.body;
        await this.updatePartner.execute({
            id,
            name,
            active,
        });
        res.status(204).send();
    }
}
exports.UpdatePartnerController = UpdatePartnerController;
