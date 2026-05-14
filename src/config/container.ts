import { createContainer, asClass, InjectionMode } from "awilix";

import { PostgrePartnerRepository } from "../infrastructure/persistence/repositories/postgreRepository/partner.repository";
import { PostgreBrandRepository } from "../infrastructure/persistence/repositories/postgreRepository/brand.repository";
import { PostgreProductRepository } from "../infrastructure/persistence/repositories/postgreRepository/product.repository";
import { PostgreContactRepository } from "../infrastructure/persistence/repositories/postgreRepository/contact.repository";

import { GetAllPartnersUseCase } from "../application/useCases/partners/getAllPartners.usecase";
import { GetPartnerByIdUseCase } from "../application/useCases/partners/getPartnerById.usecase";
import { CreatePartnerUseCase } from "../application/useCases/partners/createPartner.usecase";
import { UpdatePartnerUseCase } from "../application/useCases/partners/updatePartner.usecase";

import { GetBrandByIdUseCase } from "../application/useCases/brands/getBrandById.usecase";
import { GetBrandsByPartnerUseCase } from "../application/useCases/brands/getBrandsByPartner.usecase";
import { CreateBrandUseCase } from "../application/useCases/brands/createBrand.usecase";

import { GetProductByIdUseCase } from "../application/useCases/products/getProductById.usecase";
import { GetProductsByBrandUseCase } from "../application/useCases/products/getProductsByBrand.usecase";
import { CreateProductUseCase } from "../application/useCases/products/createProduct.usecase";

import { GetContactsByPartnerUseCase } from "../application/useCases/contacts/getContactsByPartner.usecase";
import { CreateContactUseCase } from "../application/useCases/contacts/createContact.usecase";

import { HealthService } from "../infrastructure/services/health.service";

import { HealthController } from "../infrastructure/api/controllers/health.controller";
import { PartnerController } from "../infrastructure/api/controllers/v1/partner.controller";
import { BrandController } from "../infrastructure/api/controllers/v1/brand.controller";
import { ProductController } from "../infrastructure/api/controllers/v1/product.controller";
import { ContactController } from "../infrastructure/api/controllers/v1/contact.controller";

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

// Health
container.register({
  // Service
  healthService: asClass(HealthService).singleton(),
  // Controller
  healthController: asClass(HealthController).scoped(),
});

// Partner
container.register({
  // Repository
  partnerRepository: asClass(PostgrePartnerRepository).singleton(),
  // Use cases
  getAllPartnersUseCase: asClass(GetAllPartnersUseCase).scoped(),
  getPartnerByIdUseCase: asClass(GetPartnerByIdUseCase).scoped(),
  createPartnerUseCase: asClass(CreatePartnerUseCase).scoped(),
  updatePartnerUseCase: asClass(UpdatePartnerUseCase).scoped(),
  // Controller
  partnerController: asClass(PartnerController).scoped(),
});

// Brand
container.register({
  // Repository
  brandRepository: asClass(PostgreBrandRepository).singleton(),
  // Use cases
  getBrandByIdUseCase: asClass(GetBrandByIdUseCase).scoped(),
  getBrandsByPartnerUseCase: asClass(GetBrandsByPartnerUseCase).scoped(),
  createBrandUseCase: asClass(CreateBrandUseCase).scoped(),
  // Controller
  brandController: asClass(BrandController).scoped(),
});

// Product
container.register({
  // Repository
  productRepository: asClass(PostgreProductRepository).singleton(),
  // Use cases
  getProductByIdUseCase: asClass(GetProductByIdUseCase).scoped(),
  getProductsByBrandUseCase: asClass(GetProductsByBrandUseCase).scoped(),
  createProductUseCase: asClass(CreateProductUseCase).scoped(),
  // Controller
  productController: asClass(ProductController).scoped(),
});

// Contact
container.register({
  // Repository
  contactRepository: asClass(PostgreContactRepository).singleton(),
  // Use cases
  getContactsByPartnerUseCase: asClass(GetContactsByPartnerUseCase).scoped(),
  createContactUseCase: asClass(CreateContactUseCase).scoped(),
  // Controller
  contactController: asClass(ContactController).scoped(),
});
