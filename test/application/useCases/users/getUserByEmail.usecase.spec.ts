import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IUserRepository } from '../../../../src/domain/interfaces/repositories/user.repository.interface';
import { GetUserByEmailUseCase } from '../../../../src/application/useCases/users/getUserByEmail.usecase';
import { GetUserByEmailRequestDTO, GetUserByEmailResponseDTO } from '../../../../src/application/dto/users/getUserByEmail.dto';
import { User } from '../../../../src/domain/entities/user.entity';
import { UniqueId } from '../../../../src/domain/valueObjects/uniqueId.vo';
import { Email } from '../../../../src/domain/valueObjects/email.vo';
import { UserRole } from '../../../../src/domain/enums/userRole.enum';

describe('GetUserByEmail Use Case', () => {

    let userRepository: IUserRepository;
    let useCase: GetUserByEmailUseCase;

    beforeEach(() => {
        userRepository = {
            save: vi.fn(),
            findByEmail: vi.fn(),
            findById: vi.fn(),
            findAll: vi.fn(),
        };
        useCase = new GetUserByEmailUseCase(userRepository);
    });

    //success case of getting a user by email
    it('should return a user when email exists', async () => {
        const user = new User(
            new UniqueId("550e8400-e29b-41d4-a716-446655440001"),
            "John Perez",
            new Email("john@test.com"),
            "hashedPassword123",
            UserRole.ADMIN
        );
        userRepository.findByEmail = vi.fn().mockResolvedValue(user);

        const request: GetUserByEmailRequestDTO = {email: "john@test.com"};

        const result: GetUserByEmailResponseDTO = await useCase.execute(request);

        expect(result).toBeDefined();
        expect(result).toEqual({
            id: "550e8400-e29b-41d4-a716-446655440001",
            name: "John Perez",
            email: "john@test.com",
            role: "ADMIN",
            active: true
        });
        expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
        expect(userRepository.findByEmail).toHaveBeenCalledWith("john@test.com");
    });

    //error case of getting a user with non-existing email
    it('should throw an error if user does not exist', async () => {
        userRepository.findByEmail = vi.fn().mockResolvedValue(null);

        const request: GetUserByEmailRequestDTO = {email: "unknown@test.com"};

        await expect(useCase.execute(request)).rejects.toThrow('User not found');
        expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
        expect(userRepository.findByEmail).toHaveBeenCalledWith("unknown@test.com");
    });

});