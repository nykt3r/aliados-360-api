import { Router } from "express";
import partnerRoutes from "./partner.routes";
import brandRoutes from "./brand.routes";
import productRoutes from "./product.routes";

const router = Router();

router.use("/partners", partnerRoutes);
router.use("/brands", brandRoutes);
router.use("/products", productRoutes);

export default router;
