import { IGetAllPartnersUseCase } from "../../../domain/interfaces/useCases/partners/getAllPartners.usecase.interface";
import { IPartnerRepository } from "../../../domain/interfaces/repositories/partner.repository.interface";
import { GetAllPartnersResponseDTO } from "../../dto/partners/getAllPartners.dto";
import { AppError } from "../../../shared/errors/app.error";

export class GetAllPartnersUseCase implements IGetAllPartnersUseCase  {
  constructor(
    private readonly partnerRepository: IPartnerRepository
  ) {}

  async execute(): Promise<GetAllPartnersResponseDTO[]> {
    const partners = await this.partnerRepository.findAll();

    if (!partners) throw new AppError("Error getting Partners");

    const result: GetAllPartnersResponseDTO[] = partners.map(p => ({
      id: p.getId(),
      name: p.getName(),
      active: p.isActive()
    }));
    return result;
  };
}
