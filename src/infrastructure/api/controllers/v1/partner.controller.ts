import { Request, Response } from "express";
import { CreatePartner } from "../../../../application/useCases/partners/createPartner.usecase";
import { GetPartnerById } from "../../../../application/useCases/partners/getPartnerById.usecase";
import { GetAllPartners } from "../../../../application/useCases/partners/getAllPartner.usecase";
import { UpdatePartner } from "../../../../application/useCases/partners/updatePartner.usecase";

export class CreatePartnerController {
  constructor(private createPartner: CreatePartner) {}

  async handle(req: Request, res: Response) {
    const { name } = req.body;

    const partner = await this.createPartner.execute({
      name,
    });

    res.status(201).json({
      id: partner.getId(),
      name: partner.getName(),
      active: partner.isActive(),
    });
  }

}

export class GetPartnerByIdController {
  constructor(private getPartnerById: GetPartnerById) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const partner = await this.getPartnerById.execute({
      id,
    });

    res.status(200).json({
      id: partner.getId(),
      name: partner.getName(),
      active: partner.isActive(),
    });
  }
}

export class GetAllPartnersController {
  constructor(private getAllPartners: GetAllPartners) {}
  async handle(_req: Request, res: Response) {
    const partners = await this.getAllPartners.execute();
    res.status(200).json(partners);
  }
}

export class UpdatePartnerController {
  constructor(private updatePartner: UpdatePartner) {}
  async handle(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const { name, active } = req.body;

    await this.updatePartner.execute({
      id,
      name,
      active,
    });

    res.status(204).send();
  }

}