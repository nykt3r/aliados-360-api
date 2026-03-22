import { CreatePartnerController, GetPartnerByIdController } from "../../api/controllers/v1/partner.controller";
import { CreatePartner } from "../../../application/useCases/partners/createPartner.usecase";
import { GetPartnerById } from "../../../application/useCases/partners/getPartnerById.usecase";
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