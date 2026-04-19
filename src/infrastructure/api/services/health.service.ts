import { IHealthService } from "../../../domain/interfaces/services/health.service.interface";

export class HealthService implements IHealthService {
  
    async getStatus() {
    return { 
        message: 'Api Health',
        status: "ok" 
    }
  }
}