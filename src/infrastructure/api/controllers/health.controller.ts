import { Request, Response } from "express";
import { IHealthService } from "../../../domain/interfaces/services/health.service.interface";

export class HealthController {
  constructor(private readonly healthService: IHealthService) {}

   getHealth = async (_req: Request, res: Response) => {
    const health = this.healthService.getStatus()
    res.json({
        message: (await health).message,
        status: (await health).status
    });
  } 
}