import { Router } from "express";
import { container } from "../../../../config/container";
import { ProductController } from "../../controllers/v1/product.controller";

const router = Router();

const productController = container.resolve<ProductController>("productController");

// PRODUCT RESOURCE
router.get("/:id", productController.getProductById);

export default router;
