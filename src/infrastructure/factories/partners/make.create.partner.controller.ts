import { CreatePartnerController, GetAllPartnersController, GetPartnerByIdController, UpdatePartnerController } from "../../api/controllers/v1/partner.controller";
import { CreatePartner } from "../../../application/useCases/partners/createPartner.usecase";
import { GetPartnerById } from "../../../application/useCases/partners/getPartnerById.usecase";
import { GetAllPartners } from "../../../application/useCases/partners/getAllPartner.usecase";
import { UpdatePartner } from "../../../application/useCases/partners/updatePartner.usecase";
import { InMemoryPartnerRepository } from "../../repositories/partner.repository";

export function makeCreatePartnerController(): CreatePartnerController {
  const repository = new InMemoryPartnerRepository();
  const useCase = new CreatePartner(repository);
  const controller = new CreatePartnerController(useCase);

  return controller;
}

export function makeGetPartnerByIdController(): GetPartnerByIdController {
  const repository = new InMemoryPartnerRepository();
  const useCase = new GetPartnerById(repository);
  const controller = new GetPartnerByIdController(useCase);
  return controller;
}

export function makeGetAllPartnersController(): GetAllPartnersController {
  const repository = new InMemoryPartnerRepository();
  const useCase = new GetAllPartners(repository);
  const controller = new GetAllPartnersController(useCase);
  return controller;
}

export function makeUpdatePartnerController(): UpdatePartnerController {
  const repository = new InMemoryPartnerRepository();
  const useCase = new UpdatePartner(repository);
  const controller = new UpdatePartnerController(useCase);
  return controller;
}