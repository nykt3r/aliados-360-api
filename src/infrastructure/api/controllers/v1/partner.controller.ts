import { Request, Response } from "express";
import { IGetAllPartnersUseCase } from "../../../../domain/interfaces/useCases/partners/getAllPartners.usecase.interface";
import { IGetPartnerByIdUseCase } from "../../../../domain/interfaces/useCases/partners/getPartnerById.usecase.interface";
import { ICreatePartnerUseCase } from "../../../../domain/interfaces/useCases/partners/createPartner.usecase.interface";
import { GetAllPartnersResponseDTO } from "../../../../application/dto/partners/getAllPartners.dto";
import { GetPartnerByIdRequestDTO, GetPartnerByIdResponseDTO } from "../../../../application/dto/partners/getPartnerById.dto";
import { CreatePartnerResponseDTO } from "../../../../application/dto/partners/createPartner.dto";

export class PartnerController {
  constructor(
    private readonly getAllPartnersUseCase: IGetAllPartnersUseCase,
    private readonly getPartnerByIdUseCase: IGetPartnerByIdUseCase,
    private readonly createPartnerUseCase: ICreatePartnerUseCase,
  ) {}

  getAllPartners = async (
    _req: Request, 
    res: Response<GetAllPartnersResponseDTO[]>
  ): Promise<void> => {
      const result = await this.getAllPartnersUseCase.execute();
      res.status(200).json(result);
  }

  getPartnerById = async (
    req: Request<GetPartnerByIdRequestDTO>, 
    res: Response<GetPartnerByIdResponseDTO>
  ): Promise<void> => {
    const result = await this.getPartnerByIdUseCase.execute(req.params);
    res.status(200).json(result);
  }

  createPartner = async (
    req: Request, 
    res: Response<CreatePartnerResponseDTO>
  ): Promise<void> => {
    const result = await this.createPartnerUseCase.execute(req.body);
    res.status(201).json(result);
  }

  // updatePartner = async (req: Request, res: Response) => {
  //   const { id } = req.params as { id: string };
  //   const { name, active } = req.body;
  //   await this.updatePartnerUseCase.execute({
  //     id,
  //     name,
  //     active,
  //   });
  //   res.status(204).send();
  // }
}
