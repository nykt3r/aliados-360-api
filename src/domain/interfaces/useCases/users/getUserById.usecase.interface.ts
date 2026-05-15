import {
  GetUserByIdRequestDTO,
  GetUserByIdResponseDTO,
} from "../../../../application/dto/users/getUserById.dto";

export interface IGetUserByIdUseCase {
  execute(req: GetUserByIdRequestDTO): Promise<GetUserByIdResponseDTO>;
}
