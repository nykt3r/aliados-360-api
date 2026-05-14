import { Router } from "express";
import { container } from "../../../../config/container";
import { BrandController } from "../../controllers/v1/brand.controller";

const router = Router();

router.get("/:id", async (req, res) => {
  const controller = container.resolve<BrandController>("brandController");
  return controller.getBrandById(req, res);
});

router.get("/:partnerId", async (req, res) => {
  const controller = container.resolve<BrandController>("brandController");
  return controller.getBrandsByPartner(req, res);
});

router.post("/", async (req, res) => {
  const controller = container.resolve<BrandController>("brandController");
  return controller.createBrand(req, res);
});

export default router;
