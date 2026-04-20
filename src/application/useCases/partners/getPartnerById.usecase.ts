import { IGetPartnerByIdUseCase } from "../../../domain/interfaces/useCases/partners/getPartnerById.usecase.interface";
import { IPartnerRepository } from "../../../domain/interfaces/repositories/partner.repository.interface";
import { 
  GetPartnerByIdRequestDTO, 
  GetPartnerByIdResponseDTO 
} from "../../dto/partners/getPartnerById.dto";
import { PartnerNotFoundError } from "../../../domain/errors/partner/partner.not.found.error";

export class GetPartnerByIdUseCase implements IGetPartnerByIdUseCase {
  constructor(
    private readonly partnerRepository: IPartnerRepository
  ) {}

  async execute(req: GetPartnerByIdRequestDTO): Promise<GetPartnerByIdResponseDTO> {
    const partner = await this.partnerRepository.findById(req.id);
    
    if (!partner) throw new PartnerNotFoundError();

    const result: GetPartnerByIdResponseDTO = {
      id: partner.getId(),
      name: partner.getName(),
      active: partner.isActive()
    };
    return result;
  };
}
