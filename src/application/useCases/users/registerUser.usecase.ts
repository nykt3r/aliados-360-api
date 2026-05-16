import { IRegisterUserUseCase } from "../../../domain/interfaces/useCases/users/registerUser.usecase.interface";
import { IUserRepository } from "../../../domain/interfaces/repositories/user.repository.interface";
import {
  RegisterUserRequestDTO,
  RegisterUserResponseDTO,
} from "../../dto/users/registerUser.dto";
import { User } from "../../../domain/entities/user.entity";
import { UniqueId } from "../../../domain/valueObjects/uniqueId.vo";
import { Email } from "../../../domain/valueObjects/email.vo";
import { hashPassword } from "../../../util/password.util";
import { AppError, BadRequestError } from "../../../shared/errors/app.error";
import { UserRole } from "../../../domain/enums/userRole.enum";

export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(req: RegisterUserRequestDTO): Promise<RegisterUserResponseDTO> {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

    if (!passwordRegex.test(req.password))
      throw new AppError("Error saving User: WEAK PASSWORD");

    const existingUser = await this.userRepository.findByEmail(req.email);
    if (existingUser) throw new BadRequestError("User email already exists");

    const passwordHash = await hashPassword(req.password);

    const newUser = new User(
      new UniqueId(),
      req.name,
      new Email(req.email),
      passwordHash,
      req.role as UserRole,
    );

    const savedUser = await this.userRepository.save(newUser);
    if (!savedUser) throw new AppError("Error saving User");

    const result: RegisterUserResponseDTO = {
      id: savedUser.getId(),
      name: savedUser.getName(),
      email: savedUser.getEmail(),
      role: savedUser.getRole(),
      active: savedUser.isActive(),
      message: "User registered successfully!",
    };

    return result;
  }
}
