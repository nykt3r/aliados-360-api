import { Router } from "express";
import { makeCreatePartnerController } from "../../../factories/partners/make.create.partner.controller";
import { makeGetPartnerByIdController } from "../../../factories/partners/make.create.partner.controller";

const router = Router();

const createController = makeCreatePartnerController();
const getController = makeGetPartnerByIdController();

router.post("/partners", (req, res) => createController.handle(req, res));

router.get("/partners/:id", (req, res) => getController.handle(req, res));

export default router;
