import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IUserRepository } from '../../../../src/domain/interfaces/repositories/user.repository.interface';
import { IAuthService } from '../../../../src/domain/interfaces/services/auth.service.interface';
import { LoginUserUseCase } from '../../../../src/application/useCases/users/loginUser.usecase';
import { LoginUserRequestDTO, LoginUserResponseDTO } from '../../../../src/application/dto/users/loginUser.dto';
import { User } from '../../../../src/domain/entities/user.entity';
import { UniqueId } from '../../../../src/domain/valueObjects/uniqueId.vo';
import { Email } from '../../../../src/domain/valueObjects/email.vo';
import { UserRole } from '../../../../src/domain/enums/userRole.enum';

import * as passwordUtil from '../../../../src/util/password.util';

vi.mock('../../../../src/util/password.util', () => ({
    comparePassword: vi.fn()
}));

describe('LoginUser Use Case', () => {

    let userRepository: IUserRepository;
    let authService: IAuthService;
    let useCase: LoginUserUseCase;

    beforeEach(() => {
        userRepository = {
            save: vi.fn(),
            findByEmail: vi.fn(),
            findById: vi.fn(),
            findAll: vi.fn(),
        };
        authService = {
            generateToken: vi.fn(),
            verifyToken: vi.fn(),
        };
        useCase = new LoginUserUseCase(
            userRepository,
            authService
        );
        vi.clearAllMocks();
    });

    //success case of logging in user
    it('should login successfully and return token', async () => {
        const user = new User(
            new UniqueId("550e8400-e29b-41d4-a716-446655440001"),
            "John Perez",
            new Email("john@test.com"),
            "hashedPassword123",
            UserRole.ADMIN
        );

        userRepository.findByEmail = vi.fn().mockResolvedValue(user);
        vi.mocked(passwordUtil.comparePassword).mockResolvedValue(true);
        authService.generateToken = vi.fn().mockReturnValue("fake-jwt-token");

        const request: LoginUserRequestDTO = {
            email: "john@test.com",
            password: "Strong123"
        };

        const result: LoginUserResponseDTO = await useCase.execute(request);

        expect(result).toBeDefined();
        expect(result).toEqual({
            token: "fake-jwt-token"
        });
        expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
        expect(userRepository.findByEmail).toHaveBeenCalledWith("john@test.com");
        expect(passwordUtil.comparePassword).toHaveBeenCalledWith("Strong123", "hashedPassword123");
        expect(authService.generateToken).toHaveBeenCalledWith({
            sub: "550e8400-e29b-41d4-a716-446655440001",
            email: "john@test.com",
            type: "access",
            scopes: ["user"]
        });

    });

    //error case of login with non-existing email
    it('should throw an error if user does not exist', async () => {
        userRepository.findByEmail = vi.fn().mockResolvedValue(null);

        const request: LoginUserRequestDTO = {
            email: "john@test.com",
            password: "Strong123"
        };

        await expect(useCase.execute(request)).rejects.toThrow('User invalid credentials');
        expect(passwordUtil.comparePassword).not.toHaveBeenCalled();
        expect(authService.generateToken).not.toHaveBeenCalled();
    });

    //error case of login with invalid password
    it('should throw an error if password is invalid', async () => {
        const user = new User(
            new UniqueId("550e8400-e29b-41d4-a716-446655440001"),
            "John Perez",
            new Email("john@test.com"),
            "hashedPassword123",
            UserRole.ADMIN
        );

        userRepository.findByEmail = vi.fn().mockResolvedValue(user);
        vi.mocked(passwordUtil.comparePassword).mockResolvedValue(false);

        const request: LoginUserRequestDTO = {
            email: "john@test.com",
            password: "WrongPassword123"
        };

        await expect(useCase.execute(request)).rejects.toThrow('User invalid credentials');
        expect(authService.generateToken).not.toHaveBeenCalled();
    });

});