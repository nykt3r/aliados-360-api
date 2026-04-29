import { IUpdatePartnerUseCase } from "../../../domain/interfaces/useCases/partners/updatePartner.usecase.interface";
import { IPartnerRepository } from "../../../domain/interfaces/repositories/partner.repository.interface";
import { UpdatePartnerRequestDTO, UpdatePartnerResponseDTO } from "../../../../src/application/dto/partners/updatePartner.dto";
import { UniqueId } from "../../../domain/valueObjects/uniqueId.vo";
import { Partner } from "../../../domain/entities/partner.entity";
import { AppError, NotFoundError } from "../../../shared/errors/app.error";

export class UpdatePartnerUseCase implements IUpdatePartnerUseCase {
  constructor(
    private readonly partnerRepository: IPartnerRepository
  ) {}

  async execute(req: UpdatePartnerRequestDTO): Promise<UpdatePartnerResponseDTO> {
    const existingPartner = await this.partnerRepository.findById(req.id);
    if (!existingPartner) throw new NotFoundError("Partner not found");

    const uniqueId = new UniqueId(req.id);
    const partner = new Partner(
      uniqueId, 
      req.name ?? existingPartner.getName(), 
      req.active ?? existingPartner.isActive()
    );
    
    const updatedPartner = await this.partnerRepository.update(partner);
    if (!updatedPartner) throw new AppError('Error updating Partner');

    const result: UpdatePartnerResponseDTO = {
      id: updatedPartner.getId(),
      name: updatedPartner.getName(),
      active: updatedPartner.isActive()
    };
    return result;
  }
}
