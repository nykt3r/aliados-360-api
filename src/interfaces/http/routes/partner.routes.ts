import { Router } from "express";
import { CreatePartnerController } from "../controllers/createPartner.controller";
import { CreatePartner } from "../../../application/useCases/partners/createPartner.usecase";
import { InMemoryPartnerRepository } from "../../../infrastructure/repositories/partner.repository";

const router = Router();

const repository = new InMemoryPartnerRepository();
const useCase = new CreatePartner(repository);
const controller = new CreatePartnerController(useCase);

router.post("/partners", (req, res) => controller.handle(req, res));

export default router;
