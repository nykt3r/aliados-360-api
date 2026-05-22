import { RequestHandler } from "express";
import { IGetBrandByIdUseCase } from "../../../../domain/interfaces/useCases/brands/getBrandById.usecase.interface";
import { IGetBrandsByPartnerUseCase } from "../../../../domain/interfaces/useCases/brands/getBrandsByPartner.usecase.interface";
import { ICreateBrandUseCase } from "../../../../domain/interfaces/useCases/brands/createBrand.usecase.interface";
import {
  GetBrandByIdRequestDTO,
  GetBrandByIdResponseDTO,
} from "../../../../application/dto/brands/getBrandById.dto";
import {
  GetBrandsByPartnerRequestDTO,
  GetBrandsByPartnerResponseDTO,
} from "../../../../application/dto/brands/getBrandsByPartner.dto";
import {
  CreateBrandRequestDTO,
  CreateBrandResponseDTO,
} from "../../../../application/dto/brands/createBrand.dto";

export class BrandController {
  constructor(
    private readonly getBrandByIdUseCase: IGetBrandByIdUseCase,
    private readonly getBrandsByPartnerUseCase: IGetBrandsByPartnerUseCase,
    private readonly createBrandUseCase: ICreateBrandUseCase,
  ) {}

  getBrandById: RequestHandler<
    GetBrandByIdRequestDTO,
    GetBrandByIdResponseDTO
  > = async (req, res) => {
    const result = await this.getBrandByIdUseCase.execute(req.params);
    res.status(200).json(result);
  };

  getBrandsByPartner: RequestHandler<
    GetBrandsByPartnerRequestDTO,
    GetBrandsByPartnerResponseDTO[]
  > = async (req, res) => {
    const result = await this.getBrandsByPartnerUseCase.execute(req.params);
    res.status(200).json(result);
  };

  createBrand: RequestHandler<
    { partnerId: string },
    CreateBrandResponseDTO,
    CreateBrandRequestDTO
  > = async (req, res) => {
    const request: CreateBrandRequestDTO = {
      id: req.body.id,
      name: req.body.name,
      partnerId: req.params.partnerId,
      active: req.body.active,
    };
    const result = await this.createBrandUseCase.execute(request);
    res.status(201).json(result);
  };
}
