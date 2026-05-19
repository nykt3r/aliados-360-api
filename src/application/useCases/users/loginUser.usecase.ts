import { ILoginUserUseCase } from "../../../domain/interfaces/useCases/users/loginUser.usecase.interface";
import { IUserRepository } from "../../../domain/interfaces/repositories/user.repository.interface";
import {
  LoginUserRequestDTO,
  LoginUserResponseDTO,
} from "../../dto/users/loginUser.dto";
import { comparePassword } from "../../../util/password.util";
import { IAuthService } from "../../../domain/interfaces/services/auth.service.interface";
import { BadRequestError } from "../../../shared/errors/app.error";

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authService: IAuthService,
  ) {}

  async execute(req: LoginUserRequestDTO): Promise<LoginUserResponseDTO> {
    const user = await this.userRepository.findByEmail(req.email);
    if (!user) throw new BadRequestError("User invalid credentials");

    const validPassword = await comparePassword(
      req.password,
      user.getPasswordHash(),
    );
    if (!validPassword) throw new BadRequestError("User invalid credentials");

    const token = this.authService.generateToken({
      sub: user.getId(),
      email: user.getEmail(),
      type: "access",
      scopes: ["user"],
    });

    const result: LoginUserResponseDTO = {
      token,
    };

    return result;
  }
}
