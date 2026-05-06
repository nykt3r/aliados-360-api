import { Router } from "express";
import { container } from "../../../../config/container";
import { validate } from "../../middlewares/validate.middleware";
import { 
    createPartnerRequestSchema, 
    updatePartnerParamsSchema, 
    updatePartnerBodySchema 
} from "../../../schemas/partner.schema";
import { PartnerController } from "../../controllers/v1/partner.controller";

type UpdatePartnerParams = {
  id: string;
};

const router = Router();

router.get("/", async (req, res) => {
    const controller = container.resolve<PartnerController>("partnerController");
    return controller.getAllPartners(req, res);
});

router.get("/:id", async (req, res) => {
    const controller = container.resolve<PartnerController>("partnerController");
    return controller.getPartnerById(req, res);
});

router.post("/", 
    validate({ body: createPartnerRequestSchema }), 
    async (req, res) => {
    const controller = container.resolve<PartnerController>("partnerController");
    return controller.createPartner(req, res);
});
    

router.patch<UpdatePartnerParams>("/:id", 
    validate({
        params: updatePartnerParamsSchema,
        body: updatePartnerBodySchema,
    }),
    async (req, res) => {
    const controller = container.resolve<PartnerController>("partnerController");
    return controller.updatePartner(req, res)
});

export default router;
