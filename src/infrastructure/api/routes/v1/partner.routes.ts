import { Router } from "express";
import { CreatePartnerController, GetPartnerByIdController, GetAllPartnersController, UpdatePartnerController} from "../../../api/controllers/v1/partner.controller";
import { CreatePartner } from "../../../../../src/application/useCases/partners/createPartner.usecase";
import { GetPartnerById } from "../../../../application/useCases/partners/getPartnerById.usecase";
import { InMemoryPartnerRepository } from "../../../repositories/partner.repository";
import { GetAllPartners } from "../../../../application/useCases/partners/getAllPartner.usecase";
import { UpdatePartner } from "../../../../application/useCases/partners/updatePartner.usecase";

const router = Router();

const repository = new InMemoryPartnerRepository();

const createPartnerUseCase = new CreatePartner(repository);
const createPartnerController = new CreatePartnerController(createPartnerUseCase);
const getPartnerByIdUseCase = new GetPartnerById(repository);
const getPartnerByIdController = new GetPartnerByIdController(getPartnerByIdUseCase);
const getAllPartnersUseCase = new GetAllPartners(repository);
const getAllPartnersController = new GetAllPartnersController(getAllPartnersUseCase);
const updatePartnerUseCase = new UpdatePartner(repository);
const updatePartnerController = new UpdatePartnerController(updatePartnerUseCase);

router.post("/partners", (req, res) => createPartnerController.handle(req, res));
router.get("/getbyid/partners/:id", (req, res) => getPartnerByIdController.handle(req, res));
router.get("/get/partners", (req, res) => getAllPartnersController.handle(req, res));
router.put("/update/partners/:id", (req, res) => updatePartnerController.handle(req, res));

export default router;
