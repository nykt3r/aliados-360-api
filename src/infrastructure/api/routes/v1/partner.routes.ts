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
import { authenticateJWT } from "../../middlewares/auth.middleware";

const router = Router();

// Controllers
const partnerController = container.resolve<PartnerController>("partnerController");
const brandController = container.resolve<BrandController>("brandController");
const contactController = container.resolve<ContactController>("contactController");

// PARTNERS
router.get("/", partnerController.getAllPartners);

router.get("/:id", partnerController.getPartnerById);

router.post("/",
  authenticateJWT,
  validate({
    body: createPartnerRequestSchema,
  }),
  partnerController.createPartner,
);

router.patch("/:id",
  authenticateJWT,
  validate({
    params: updatePartnerParamsSchema,
    body: updatePartnerBodySchema,
  }),
  partnerController.updatePartner,
);

// BRANDS BY PARTNER
router.get("/:partnerId/brands", brandController.getBrandsByPartner);

router.post("/:partnerId/brands", 
  authenticateJWT, 
  brandController.createBrand
);

// CONTACTS BY PARTNER
router.get("/:partnerId/contacts", contactController.getContactsByPartner);

router.post("/:partnerId/contacts",
  authenticateJWT,
  contactController.createContact,
);

export default router;
