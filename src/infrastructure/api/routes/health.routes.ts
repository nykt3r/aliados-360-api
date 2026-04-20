import { Router } from "express";
import { HealthController } from "../../api/controllers/health.controller";
import { HealthService } from "../../services/health.service"

const router = Router();

const healthService = new HealthService()
const healthController = new HealthController(healthService);

router.get("/", async (req, res) => healthController.getHealth(req, res))

export default router;