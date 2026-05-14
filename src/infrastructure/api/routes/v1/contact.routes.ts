import { Router } from "express";
import { container } from "../../../../config/container";
import { ContactController } from "../../controllers/v1/contact.controller";

const router = Router();

router.get("/:partnerId", async (req, res) => {
  const controller = container.resolve<ContactController>("contactController");
  return controller.getContactsByPartner(req, res);
});

router.post("/", async (req, res) => {
  const controller = container.resolve<ContactController>("contactController");
  return controller.createContact(req, res);
});

export default router;
