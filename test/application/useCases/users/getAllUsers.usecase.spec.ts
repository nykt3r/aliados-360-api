import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IUserRepository } from '../../../../src/domain/interfaces/repositories/user.repository.interface';
import { GetAllUsersUseCase } from '../../../../src/application/useCases/users/getAllUsers.usecase';
import { GetAllUsersResponseDTO } from '../../../../src/application/dto/users/getAllUsers.dto';
import { User } from '../../../../src/domain/entities/user.entity';
import { UniqueId } from '../../../../src/domain/valueObjects/uniqueId.vo';
import { Email } from '../../../../src/domain/valueObjects/email.vo';
import { UserRole } from '../../../../src/domain/enums/userRole.enum';

describe('GetAllUsers Use Case', () => {

    let userRepository: IUserRepository;
    let useCase: GetAllUsersUseCase;

    beforeEach(() => {
        userRepository = {
            save: vi.fn(),
            findByEmail: vi.fn(),
            findById: vi.fn(),
            findAll: vi.fn(),
        }
        useCase = new GetAllUsersUseCase(userRepository);
    });

    //success case of getting all users
    it('should return all users', async () => {
        const users = [
            new User(
                new UniqueId("550e8400-e29b-41d4-a716-446655440001"),
                "John Perez",
                new Email("john@test.com"),
                "hashedPassword123",
                UserRole.ADMIN
            ),
            new User(
                new UniqueId("550e8400-e29b-41d4-a716-446655440002"),
                "Maria Gomez",
                new Email("maria@test.com"),
                "hashedPassword456",
                UserRole.VIEWER
            )
        ];

        userRepository.findAll = vi.fn().mockResolvedValue(users);

        const result: GetAllUsersResponseDTO[] = await useCase.execute();

        expect(result).toBeInstanceOf(Array);
        expect(result).toEqual([
            {
                id: "550e8400-e29b-41d4-a716-446655440001",
                name: "John Perez",
                email: "john@test.com",
                passwordHash: "hashedPassword123",
                role: "ADMIN",
                active: true
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440002",
                name: "Maria Gomez",
                email: "maria@test.com",
                passwordHash: "hashedPassword456",
                role: "VIEWER",
                active: true
            }
        ]);
        expect(userRepository.findAll).toHaveBeenCalledTimes(1);
    });

    //error case of getting all users when repository fails
    it('should throw an error if getting users fails', async () => {
        userRepository.findAll = vi.fn().mockResolvedValue(null);

        await expect(useCase.execute()).rejects.toThrow('Error getting Users');
        expect(userRepository.findAll).toHaveBeenCalledTimes(1);
    });

});