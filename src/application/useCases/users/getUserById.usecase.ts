import { IGetUserByIdUseCase } from "../../../domain/interfaces/useCases/users/getUserById.usecase.interface";
import { IUserRepository } from "../../../domain/interfaces/repositories/user.repository.interface";
import {
  GetUserByIdRequestDTO,
  GetUserByIdResponseDTO,
} from "../../dto/users/getUserById.dto";
import { NotFoundError } from "../../../shared/errors/app.error";

export class GetUserByIdUseCase implements IGetUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(req: GetUserByIdRequestDTO): Promise<GetUserByIdResponseDTO> {
    const user = await this.userRepository.findById(req.id);
    if (!user) throw new NotFoundError("User not found");

    const result: GetUserByIdResponseDTO = {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole(),
      active: user.isActive(),
    };

    return result;
  }
}
