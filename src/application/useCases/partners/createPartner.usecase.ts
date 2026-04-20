import { ICreatePartnerUseCase } from "../../../domain/interfaces/useCases/partners/createPartner.usecase.interface";
import { IPartnerRepository } from "../../../domain/interfaces/repositories/partner.repository.interface";
import { CreatePartnerRequestDTO, CreatePartnerResponseDTO } from "../../dto/partners/createPartner.dto";
import { UniqueId } from "../../../domain/valueObjects/uniqueId.vo";
import { Partner } from "../../../domain/entities/partner.entity";
import { AppError } from "../../../shared/errors/app.error";

export class CreatePartnerUseCase implements ICreatePartnerUseCase {
  constructor(
    private readonly partnerRepository: IPartnerRepository
  ) {}

  async execute(req: CreatePartnerRequestDTO): Promise<CreatePartnerResponseDTO> {
    const newUniqueId = new UniqueId(req.id);
    const newPartner = new Partner(newUniqueId, req.name, req.active);

    const existingPartner = await this.partnerRepository.findById(newPartner.getId());
    if (existingPartner) throw new AppError('Partner already exists');

    const savedPartner = await this.partnerRepository.save(newPartner);
    if (!savedPartner) throw new AppError('Error saving Partner');
    
    const result: CreatePartnerResponseDTO = {
      id: savedPartner.getId(),
      name: savedPartner.getName(),
      active: savedPartner.isActive()
    };
    return result;
  };
}
