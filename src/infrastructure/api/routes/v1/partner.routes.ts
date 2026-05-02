import { Router } from "express";
import { JsonPartnerRepository } from "../../../persistence/repositories/jsonRepository/partner.repository";
import { GetAllPartnersUseCase } from "../../../../application/useCases/partners/getAllPartners.usecase";
import { GetPartnerByIdUseCase } from "../../../../application/useCases/partners/getPartnerById.usecase";
import { CreatePartnerUseCase } from "../../../../application/useCases/partners/createPartner.usecase";
import { UpdatePartnerUseCase } from "../../../../application/useCases/partners/updatePartner.usecase";
import { PartnerController } from "../../../api/controllers/v1/partner.controller";
import { validate } from "../../middlewares/validateRequest.middleware";
import { createPartnerRequestSchema, updatePartnerParamsSchema, updatePartnerBodySchema } from "../../../schemas/partner.schema";

type UpdatePartnerParams = {
  id: string;
};

const router = Router();

const repository = new JsonPartnerRepository();

const getAllPartnersUseCase = new GetAllPartnersUseCase(repository);
const getPartnerByIdUseCase = new GetPartnerByIdUseCase(repository);
const createPartnerUseCase = new CreatePartnerUseCase(repository);
const updatePartnerUseCase = new UpdatePartnerUseCase(repository);

const partnerController = new PartnerController(
    getAllPartnersUseCase, 
    getPartnerByIdUseCase, 
    createPartnerUseCase,
    updatePartnerUseCase
);

router.get("/partners", (req, res) => partnerController.getAllPartners(req, res));
router.get("/partners/:id", (req, res) => partnerController.getPartnerById(req, res));
router.post("/partners", validate({ body: createPartnerRequestSchema }), (req, res) => partnerController.createPartner(req, res));
router.patch<UpdatePartnerParams>("/partners/:id", 
    validate({
        params: updatePartnerParamsSchema,
        body: updatePartnerBodySchema,
    }),
    (req, res) => partnerController.updatePartner(req, res)
);

export default router;
