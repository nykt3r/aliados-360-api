import { Request, Response } from "express";
import { IGetContactsByPartnerUseCase } from "../../../../domain/interfaces/useCases/contacts/getContactsByPartner.usecase.interface";
import { ICreateContactUseCase } from "../../../../domain/interfaces/useCases/contacts/createContact.usecase.interface";
import {
  GetContactsByPartnerRequestDTO,
  GetContactsByPartnerResponseDTO,
} from "../../../../application/dto/contacts/getContactsByPartner.dto";
import {
  CreateContactRequestDTO,
  CreateContactResponseDTO,
} from "../../../../application/dto/contacts/createContact.dto";

export class ContactController {
  constructor(
    private readonly getContactsByPartnerUseCase: IGetContactsByPartnerUseCase,
    private readonly createContactUseCase: ICreateContactUseCase,
  ) {}

  getContactsByPartner = async (
    req: Request<GetContactsByPartnerRequestDTO>,
    res: Response<GetContactsByPartnerResponseDTO[]>,
  ): Promise<void> => {
    const result = await this.getContactsByPartnerUseCase.execute(req.params);
    res.status(200).json(result);
  };

  createContact = async (
    req: Request<
      { partnerId: string },
      CreateContactResponseDTO,
      CreateContactRequestDTO
    >,
    res: Response<CreateContactResponseDTO>,
  ): Promise<void> => {
    const request: CreateContactRequestDTO = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      partnerId: req.params.partnerId,
    };
    const result = await this.createContactUseCase.execute(request);
    res.status(201).json(result);
  };
}
