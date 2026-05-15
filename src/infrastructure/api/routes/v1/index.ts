import { Router } from "express";
import partnerRoutes from "./partner.routes";
import brandRoutes from "./brand.routes";
import productRoutes from "./product.routes";
import userRoutes from "./user.routes";

const router = Router();

router.use("/partners", partnerRoutes);
router.use("/brands", brandRoutes);
router.use("/products", productRoutes);
router.use("/users", userRoutes);

export default router;
