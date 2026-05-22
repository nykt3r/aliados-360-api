import { RequestHandler } from "express";
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

  getContactsByPartner: RequestHandler<
    GetContactsByPartnerRequestDTO,
    GetContactsByPartnerResponseDTO[]
  > = async (req, res) => {
    const result = await this.getContactsByPartnerUseCase.execute(req.params);
    res.status(200).json(result);
  };

  createContact: RequestHandler<
    { partnerId: string },
    CreateContactResponseDTO,
    CreateContactRequestDTO
  > = async (req, res) => {
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
