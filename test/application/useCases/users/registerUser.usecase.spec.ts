import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IUserRepository } from '../../../../src/domain/interfaces/repositories/user.repository.interface';
import { RegisterUserUseCase } from '../../../../src/application/useCases/users/registerUser.usecase';
import { RegisterUserRequestDTO, RegisterUserResponseDTO } from '../../../../src/application/dto/users/registerUser.dto';

describe('RegisterUser Use Case', () => {

    let userRepository: IUserRepository;
    let useCase: RegisterUserUseCase;

    beforeEach(() => {
        userRepository = {
            save: vi.fn(),
            findByEmail: vi.fn(),
            findById: vi.fn(),
            findAll: vi.fn(),
        }
        useCase = new RegisterUserUseCase(userRepository)
    });

    //success case of registering a user
    it('should register and save a user', async () => {
        userRepository.findByEmail = vi.fn().mockResolvedValue(null);
        userRepository.save = vi.fn().mockImplementation(async (user) => user);

        const request: RegisterUserRequestDTO = {
            name: "John Perez",
            email: "john.perez@example.com",
            password: "securePassword123",
            role: "admin"
        };

        const response: RegisterUserResponseDTO = await useCase.execute(request);

        expect(response).toBeDefined();
        expect(response).toEqual({
            id: expect.any(String),
            name: "John Perez",
            email: "john.perez@example.com",
            role: "admin",
            active: true,
            message: "User registered successfully!"
        });
        expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
        expect(userRepository.findByEmail).toHaveBeenCalledWith("john.perez@example.com");
        expect(userRepository.save).toHaveBeenCalledTimes(1);
        expect(userRepository.save).toHaveBeenCalledWith(
            expect.objectContaining({
                getId: expect.any(Function),
                getName: expect.any(Function),
                getEmail: expect.any(Function),
                getPasswordHash: expect.any(Function),
                getRole: expect.any(Function),
                isActive: expect.any(Function),
            })
        );
    });

    //Error case of registering a user with weak password
    it('should throw an error if password is weak', async () => {
        const request: RegisterUserRequestDTO = {
            name: "John Perez",
            email: "john.perez@example.com",
            password: "weak",
            role: "admin"
        };

        await expect(useCase.execute(request)).rejects.toThrow("Error saving User: WEAK PASSWORD");
        expect(userRepository.findByEmail).not.toHaveBeenCalled();
        expect(userRepository.save).not.toHaveBeenCalled();
    });

    //Error case of failing while saving user
    it('should throw an error if saving fails', async () => {
        userRepository.findByEmail = vi.fn().mockResolvedValue(null);
        userRepository.save = vi.fn().mockResolvedValue(null);

        const request: RegisterUserRequestDTO = {
            name: "John Perez",
            email: "john.perez@example.com",
            password: "Strong123",
            role: "ADMIN"
        };

        await expect(useCase.execute(request)).rejects.toThrow('Error saving User');
        expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
        expect(userRepository.save).toHaveBeenCalledTimes(1);

    });

    //Error case of registering a user with an email that already exists
    it('should throw an error if email already exists', async () => {
        userRepository.findByEmail = vi.fn().mockResolvedValue({ getEmail: () => "john.perez@example.com" });

        const request: RegisterUserRequestDTO = {
            name: "John Perez",
            email: "john.perez@example.com",
            password: "securePassword123",
            role: "admin"
        };

        await expect(useCase.execute(request)).rejects.toThrow("User email already exists");
        expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
        expect(userRepository.save).not.toHaveBeenCalled();
    });

});