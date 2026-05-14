import { Router } from "express";
import { container } from "../../../../config/container";
import { validate } from "../../middlewares/validate.middleware";
import {
  createPartnerRequestSchema,
  updatePartnerParamsSchema,
  updatePartnerBodySchema,
} from "../../../schemas/partner.schema";
import { PartnerController } from "../../controllers/v1/partner.controller";
import { BrandController } from "../../controllers/v1/brand.controller";
import { ContactController } from "../../controllers/v1/contact.controller";

type UpdatePartnerParams = {
  id: string;
};

const router = Router();

// PARTNERS
router.get("/", async (req, res) => {
  const controller = container.resolve<PartnerController>("partnerController");
  return controller.getAllPartners(req, res);
});

router.get("/:id", async (req, res) => {
  //partnerId
  const controller = container.resolve<PartnerController>("partnerController");
  return controller.getPartnerById(req, res);
});

router.post(
  "/",
  validate({ body: createPartnerRequestSchema }),
  async (req, res) => {
    const controller =
      container.resolve<PartnerController>("partnerController");
    return controller.createPartner(req, res);
  },
);

router.patch<UpdatePartnerParams>(
  "/:id", //partnerId
  validate({
    params: updatePartnerParamsSchema,
    body: updatePartnerBodySchema,
  }),
  async (req, res) => {
    const controller =
      container.resolve<PartnerController>("partnerController");
    return controller.updatePartner(req, res);
  },
);

// BRANDS BY PARTNER
router.get("/:partnerId/brands", async (req, res) => {
  const controller = container.resolve<BrandController>("brandController");
  return controller.getBrandsByPartner(req, res);
});

router.post("/:partnerId/brands", async (req, res) => {
  const controller = container.resolve<BrandController>("brandController");
  return controller.createBrand(req, res);
});

// CONTACTS BY PARTNER
router.get("/:partnerId/contacts", async (req, res) => {
  const controller = container.resolve<ContactController>("contactController");
  return controller.getContactsByPartner(req, res);
});

router.post("/:partnerId/contacts", async (req, res) => {
  const controller = container.resolve<ContactController>("contactController");
  return controller.createContact(req, res);
});

export default router;
