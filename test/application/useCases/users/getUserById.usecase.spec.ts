import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IUserRepository } from '../../../../src/domain/interfaces/repositories/user.repository.interface';
import { GetUserByIdUseCase } from '../../../../src/application/useCases/users/getUserById.usecase';
import { GetUserByIdRequestDTO, GetUserByIdResponseDTO } from '../../../../src/application/dto/users/getUserById.dto';
import { User } from '../../../../src/domain/entities/user.entity';
import { UniqueId } from '../../../../src/domain/valueObjects/uniqueId.vo';
import { Email } from '../../../../src/domain/valueObjects/email.vo';
import { UserRole } from '../../../../src/domain/enums/userRole.enum';

describe('GetUserById Use Case', () => {

    let userRepository: IUserRepository;
    let useCase: GetUserByIdUseCase;

    beforeEach(() => {
        userRepository = {
            save: vi.fn(),
            findByEmail: vi.fn(),
            findById: vi.fn(),
            findAll: vi.fn(),
        }
        useCase = new GetUserByIdUseCase(userRepository);
    });

    //success case of getting a user by id
    it('should return a user when it exists', async () => {
        const user = new User(
            new UniqueId("550e8400-e29b-41d4-a716-446655440001"),
            "John Perez",
            new Email("john@test.com"),
            "hashedPassword123",
            UserRole.ADMIN
        );
        userRepository.findById = vi.fn().mockResolvedValue(user);

        const request: GetUserByIdRequestDTO = { id: "550e8400-e29b-41d4-a716-446655440001"};
        const result: GetUserByIdResponseDTO = await useCase.execute(request);

        expect(result).toBeDefined();
        expect(result).toEqual({
            id: "550e8400-e29b-41d4-a716-446655440001",
            name: "John Perez",
            email: "john@test.com",
            role: "ADMIN",
            active: true
        });
        expect(userRepository.findById).toHaveBeenCalledTimes(1);
        expect(userRepository.findById).toHaveBeenCalledWith("550e8400-e29b-41d4-a716-446655440001");
    });

    //error case of getting a non-existing user
    it('should throw an error if user does not exist', async () => {
        userRepository.findById = vi.fn().mockResolvedValue(null);

        const request: GetUserByIdRequestDTO = {id: "550e8400-e29b-41d4-a716-446655440001"};

        await expect( useCase.execute(request)).rejects.toThrow('User not found');
        expect(userRepository.findById).toHaveBeenCalledTimes(1);
        expect(userRepository.findById).toHaveBeenCalledWith("550e8400-e29b-41d4-a716-446655440001");
    });

});