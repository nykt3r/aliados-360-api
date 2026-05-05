import { Router } from "express";
import { container } from "../../../config/container";
import { HealthController } from "../../api/controllers/health.controller";

const router = Router();

router.get("/",  async (req, res) => {
    const controller = container.resolve<HealthController>("healthController")
    return controller.getHealth(req, res);
});

export default router;
