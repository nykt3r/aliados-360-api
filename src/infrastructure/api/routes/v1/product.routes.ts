import { Router } from "express";
import { container } from "../../../../config/container";
import { ProductController } from "../../controllers/v1/product.controller";

const router = Router();

// PRODUCT RESOURCE
router.get("/:id", async (req, res) => {
  //productId
  const controller = container.resolve<ProductController>("productController");
  return controller.getProductById(req, res);
});

export default router;
