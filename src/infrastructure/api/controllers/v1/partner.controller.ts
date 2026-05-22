import { RequestHandler } from "express";
import { IGetAllPartnersUseCase } from "../../../../domain/interfaces/useCases/partners/getAllPartners.usecase.interface";
import { IGetPartnerByIdUseCase } from "../../../../domain/interfaces/useCases/partners/getPartnerById.usecase.interface";
import { ICreatePartnerUseCase } from "../../../../domain/interfaces/useCases/partners/createPartner.usecase.interface";
import { IUpdatePartnerUseCase } from "../../../../domain/interfaces/useCases/partners/updatePartner.usecase.interface";
import { GetAllPartnersResponseDTO } from "../../../../application/dto/partners/getAllPartners.dto";
import {
  GetPartnerByIdRequestDTO,
  GetPartnerByIdResponseDTO,
} from "../../../../application/dto/partners/getPartnerById.dto";
import {
  CreatePartnerRequestDTO,
  CreatePartnerResponseDTO,
} from "../../../../application/dto/partners/createPartner.dto";
import {
  UpdatePartnerRequestDTO,
  UpdatePartnerResponseDTO,
} from "../../../../application/dto/partners/updatePartner.dto";

export class PartnerController {
  constructor(
    private readonly getAllPartnersUseCase: IGetAllPartnersUseCase,
    private readonly getPartnerByIdUseCase: IGetPartnerByIdUseCase,
    private readonly createPartnerUseCase: ICreatePartnerUseCase,
    private readonly updatePartnerUseCase: IUpdatePartnerUseCase,
  ) {}

  getAllPartners: RequestHandler<{}, GetAllPartnersResponseDTO[]> = async (
    _req,
    res,
  ) => {
    const result = await this.getAllPartnersUseCase.execute();
    res.status(200).json(result);
  };

  getPartnerById: RequestHandler<
    GetPartnerByIdRequestDTO,
    GetPartnerByIdResponseDTO
  > = async (req, res) => {
    const result = await this.getPartnerByIdUseCase.execute(req.params);
    res.status(200).json(result);
  };

  createPartner: RequestHandler<
    {},
    CreatePartnerResponseDTO,
    CreatePartnerRequestDTO
  > = async (req, res) => {
    const result = await this.createPartnerUseCase.execute(req.body);
    res.status(201).json(result);
  };

  updatePartner: RequestHandler<
    { id: string },
    UpdatePartnerResponseDTO,
    UpdatePartnerRequestDTO
  > = async (req, res) => {
    const request: UpdatePartnerRequestDTO = {
      id: req.params.id,
      name: req.body.name,
      active: req.body.active,
    };
    const result = await this.updatePartnerUseCase.execute(request);
    res.status(200).json(result);
  };
}
