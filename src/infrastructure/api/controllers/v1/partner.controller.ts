import { Request, Response } from "express";
import { CreatePartner } from "../../../../application/useCases/partners/createPartner.usecase";
import { GetPartnerById } from "../../../../application/useCases/partners/getPartnerById.usecase";

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

