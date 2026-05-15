import { GetAllUsersResponseDTO } from "../../../../application/dto/users/getAllUsers.dto";

export interface IGetAllUsersUseCase {
  execute(): Promise<GetAllUsersResponseDTO[]>;
}
