import { Router } from "express";
import { container } from "../../../../config/container";
import { BrandController } from "../../controllers/v1/brand.controller";
import { ProductController } from "../../controllers/v1/product.controller";
import { authenticateJWT } from "../../middlewares/auth.middleware";

const router = Router();

const brandController = container.resolve<BrandController>("brandController");
const productController = container.resolve<ProductController>("productController");

// BRAND RESOURCE
router.get("/:id", brandController.getBrandById);

// PRODUCTS BY BRAND
router.get("/:brandId/products", productController.getProductsByBrand);

router.post(
  "/:brandId/products",
  authenticateJWT,
  productController.createProduct,
);

export default router;
