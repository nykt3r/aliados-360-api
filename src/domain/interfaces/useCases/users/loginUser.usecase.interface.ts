import {
  LoginUserRequestDTO,
  LoginUserResponseDTO,
} from "../../../../application/dto/users/loginUser.dto";

export interface ILoginUserUseCase {
  execute(req: LoginUserRequestDTO): Promise<LoginUserResponseDTO>;
}
