import { ICreateBrandUseCase } from "../../../domain/interfaces/useCases/brands/createBrand.usecase.interface";
import { IBrandRepository } from "../../../domain/interfaces/repositories/brand.repository.interface";
import {
  CreateBrandRequestDTO,
  CreateBrandResponseDTO,
} from "../../dto/brands/createBrand.dto";
import { UniqueId } from "../../../domain/valueObjects/uniqueId.vo";
import { Brand } from "../../../domain/entities/brand.entity";
import { AppError, BadRequestError } from "../../../shared/errors/app.error";

export class CreateBrandUseCase implements ICreateBrandUseCase {
  constructor(
    private readonly brandRepository: IBrandRepository,
    private readonly partnerRepository: IBrandRepository,
  ) {}

  async execute(req: CreateBrandRequestDTO): Promise<CreateBrandResponseDTO> {
    const existingPartner = await this.partnerRepository.findById(
      req.partnerId,
    );
    if (!existingPartner) throw new BadRequestError("Partner not found");

    const partnerBrands = await this.brandRepository.findByPartnerId(
      req.partnerId,
    );
    const duplicateBrand = partnerBrands.find(
      (brand) => brand.getName().toLowerCase() === req.name.toLowerCase(),
    );
    if (duplicateBrand) throw new BadRequestError("Brand name already exists for this partner");

    const newUniqueId = new UniqueId(req.id);
    const partnerId = new UniqueId(req.partnerId);
    const newBrand = new Brand(newUniqueId, req.name, partnerId, req.active);

    const savedBrand = await this.brandRepository.save(newBrand);
    if (!savedBrand) throw new AppError("Error saving Brand");

    const result: CreateBrandResponseDTO = {
      id: savedBrand.getId(),
      name: savedBrand.getName(),
      partnerId: savedBrand.getPartnerId(),
      active: savedBrand.isActive(),
    };

    return result;
  }
}
