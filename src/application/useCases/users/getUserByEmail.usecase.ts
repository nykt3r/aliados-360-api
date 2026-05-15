import { IGetUserByEmailUseCase } from "../../../domain/interfaces/useCases/users/getUserByEmail.usecase.interface";
import { IUserRepository } from "../../../domain/interfaces/repositories/user.repository.interface";
import {
  GetUserByEmailRequestDTO,
  GetUserByEmailResponseDTO,
} from "../../dto/users/getUserByEmail.dto";
import { NotFoundError } from "../../../shared/errors/app.error";

export class GetUserByEmailUseCase implements IGetUserByEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(req: GetUserByEmailRequestDTO): Promise<GetUserByEmailResponseDTO> {
    const user = await this.userRepository.findByEmail(req.email);
    if (!user) throw new NotFoundError("User not found");

    const result: GetUserByEmailResponseDTO = {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole(),
      active: user.isActive(),
    };

    return result;
  }
}
