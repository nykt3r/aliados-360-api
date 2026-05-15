import { Router } from "express";
import { container } from "../../../../config/container";
import { BrandController } from "../../controllers/v1/brand.controller";
import { ProductController } from "../../controllers/v1/product.controller";

const router = Router();

// BRAND RESOURCE
router.get("/:id", async (req, res) => {
  //brandId
  const controller = container.resolve<BrandController>("brandController");
  return controller.getBrandById(req, res);
});

// PRODUCTS BY BRAND
router.get("/:brandId/products", async (req, res) => {
  const controller = container.resolve<ProductController>("productController");
  return controller.getProductsByBrand(req, res);
});

router.post("/:brandId/products", async (req, res) => {
  const controller = container.resolve<ProductController>("productController");
  return controller.createProduct(req, res);
});

export default router;
