import { Router } from "express";
import partnerRoutes from "./partner.routes";
import brandRoutes from "./brand.routes";
import productRoutes from "./product.routes";
import contactRoutes from "./contact.routes";

const router = Router();

router.use("/partners", partnerRoutes);
router.use("/brands", brandRoutes);
router.use("/products", productRoutes);
router.use("/contacts", contactRoutes);

export default router;
