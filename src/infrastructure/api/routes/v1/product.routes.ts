import { Router } from "express";
import { container } from "../../../../config/container";
import { ProductController } from "../../controllers/v1/product.controller";

const router = Router();

router.get("/:id", async (req, res) => {
  const controller = container.resolve<ProductController>("productController");
  return controller.getProductById(req, res);
});

router.get("/:brandId", async (req, res) => {
  const controller = container.resolve<ProductController>("productController");
  return controller.getProductsByBrand(req, res);
});

router.post("/", async (req, res) => {
  const controller = container.resolve<ProductController>("productController");
  return controller.createProduct(req, res);
});

export default router;
