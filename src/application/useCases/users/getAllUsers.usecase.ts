import { IGetAllUsersUseCase } from "../../../domain/interfaces/useCases/users/getAllUsers.usecase.interface";
import { IUserRepository } from "../../../domain/interfaces/repositories/user.repository.interface";
import { GetAllUsersResponseDTO } from "../../dto/users/getAllUsers.dto";
import { NotFoundError } from "../../../shared/errors/app.error";

export class GetAllUsersUseCase implements IGetAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<GetAllUsersResponseDTO[]> {
    const users = await this.userRepository.findAll();
    if (!users) throw new NotFoundError("Error getting Users");

    const result: GetAllUsersResponseDTO[] = users.map((user) => ({
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      role: user.getRole(),
      active: user.isActive(),
    }));

    return result;
  }
}
