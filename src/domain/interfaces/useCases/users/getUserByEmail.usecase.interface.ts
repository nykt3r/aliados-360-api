import {
  GetUserByEmailRequestDTO,
  GetUserByEmailResponseDTO,
} from "../../../../application/dto/users/getUserByEmail.dto";

export interface IGetUserByEmailUseCase {
  execute(req: GetUserByEmailRequestDTO): Promise<GetUserByEmailResponseDTO>;
}
