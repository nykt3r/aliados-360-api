import { Router } from "express";
import partnerRoutes from "./partner.routes";

const router = Router();

router.use("/partners", partnerRoutes);

export default router;
