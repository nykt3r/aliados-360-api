import { Request, Response } from "express";
import { CreatePartner } from "../../../application/useCases/partners/createPartner.usecase";

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
