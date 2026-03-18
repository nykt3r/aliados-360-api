import { Router } from "express";
import { makeCreatePartnerController } from "../../../infrastructure/factories/partners/make.create.partner.controller";

const router = Router();

const controller = makeCreatePartnerController();

router.post("/partners", (req, res) => controller.handle(req, res));

export default router;
