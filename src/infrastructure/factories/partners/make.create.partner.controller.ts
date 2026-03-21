import { CreatePartnerController } from "../../api/controllers/createPartner.controller";
import { CreatePartner } from "../../../application/useCases/partners/createPartner.usecase";
import { InMemoryPartnerRepository } from "../../repositories/partner.repository";

export function makeCreatePartnerController(): CreatePartnerController {
  const repository = new InMemoryPartnerRepository();
  const useCase = new CreatePartner(repository);
  const controller = new CreatePartnerController(useCase);

  return controller;
}