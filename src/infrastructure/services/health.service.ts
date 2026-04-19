import { IHealthService } from "../../domain/interfaces/services/health.service.interface";

export class HealthService implements IHealthService {
  
    async getStatus() {
    return { 
        message: 'Aliados 360 API - Health',
        status: "ok" 
    }
  }
}