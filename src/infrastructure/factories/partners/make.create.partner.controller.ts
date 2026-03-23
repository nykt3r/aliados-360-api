import { CreatePartnerController } from "../../api/controllers/createPartner.controller";
import { CreatePartner } from "../../../application/useCases/partners/createPartner.usecase";
import { JsonPartnerRepository } from "../../persistence/repositories/jsonRepository/partner.repository";

export function makeCreatePartnerController(): CreatePartnerController {
  const repository = new JsonPartnerRepository();
  const useCase = new CreatePartner(repository);
  const controller = new CreatePartnerController(useCase);

  return controller;
}