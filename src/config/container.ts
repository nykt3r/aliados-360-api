import { createContainer, asClass, InjectionMode } from "awilix";
import { PostgrePartnerRepository } from "../infrastructure/persistence/repositories/postgreRepository/partner.repository";
import { PostgreBrandRepository } from "../infrastructure/persistence/repositories/postgreRepository/brand.repository";
import { PostgreProductRepository } from "../infrastructure/persistence/repositories/postgreRepository/product.repository";
import { PostgreContactRepository } from "../infrastructure/persistence/repositories/postgreRepository/contact.repository";
import { GetAllPartnersUseCase } from "../application/useCases/partners/getAllPartners.usecase";
import { GetPartnerByIdUseCase } from "../application/useCases/partners/getPartnerById.usecase";
import { CreatePartnerUseCase } from "../application/useCases/partners/createPartner.usecase";
import { UpdatePartnerUseCase } from "../application/useCases/partners/updatePartner.usecase";
import { HealthService } from "../infrastructure/services/health.service";
import { HealthController } from "../infrastructure/api/controllers/health.controller";
import { PartnerController } from "../infrastructure/api/controllers/v1/partner.controller";

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({
  // Repositories
  partnerRepository: asClass(PostgrePartnerRepository).singleton(),
  brandRepository: asClass(PostgreBrandRepository).singleton(),
  productRepository: asClass(PostgreProductRepository).singleton(),
  contactRepository: asClass(PostgreContactRepository).singleton(),

  // Use cases
  getAllPartnersUseCase: asClass(GetAllPartnersUseCase).scoped(),
  getPartnerByIdUseCase: asClass(GetPartnerByIdUseCase).scoped(),
  createPartnerUseCase: asClass(CreatePartnerUseCase).scoped(),
  updatePartnerUseCase: asClass(UpdatePartnerUseCase).scoped(),

  // Services
  healthService: asClass(HealthService).singleton(),

  // Controllers
  partnerController: asClass(PartnerController).scoped(),
  healthController: asClass(HealthController).scoped(),
});
