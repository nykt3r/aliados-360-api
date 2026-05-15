import {
  RegisterUserRequestDTO,
  RegisterUserResponseDTO,
} from "../../../../application/dto/users/registerUser.dto";

export interface IRegisterUserUseCase {
  execute(req: RegisterUserRequestDTO): Promise<RegisterUserResponseDTO>;
}
