import { Router } from "express";
import { JsonPartnerRepository } from "../../../persistence/repositories/jsonRepository/partner.repository";
import { GetPartnerById } from "../../../../application/useCases/partners/getPartnerById.usecase";
import { GetAllPartners } from "../../../../application/useCases/partners/getAllPartner.usecase";
import { CreatePartner } from "../../../../../src/application/useCases/partners/createPartner.usecase";
import { UpdatePartner } from "../../../../application/useCases/partners/updatePartner.usecase";
import { validateRequest } from "../../middlewares/validateRequest.middleware";
import { createPartnerSchema } from "../../../schemas/partner.schema";
import {GetPartnerByIdController, GetAllPartnersController, CreatePartnerController, UpdatePartnerController} from "../../../api/controllers/v1/partner.controller";

const router = Router();

const repository = new JsonPartnerRepository();

const getPartnerByIdUseCase = new GetPartnerById(repository);
const getAllPartnersUseCase = new GetAllPartners(repository);
const createPartnerUseCase = new CreatePartner(repository);
const updatePartnerUseCase = new UpdatePartner(repository);

const getPartnerByIdController = new GetPartnerByIdController(getPartnerByIdUseCase);
const getAllPartnersController = new GetAllPartnersController(getAllPartnersUseCase);
const createPartnerController = new CreatePartnerController(createPartnerUseCase);
const updatePartnerController = new UpdatePartnerController(updatePartnerUseCase);

router.get("/partners", (req, res) => getAllPartnersController.handle(req, res));
router.get("/partners/:id", (req, res) => getPartnerByIdController.handle(req, res));

router.post("/partners", validateRequest(createPartnerSchema), (req, res) => createPartnerController.handle(req, res));

router.put("/partners/:id", (req, res) => updatePartnerController.handle(req, res));

export default router;
