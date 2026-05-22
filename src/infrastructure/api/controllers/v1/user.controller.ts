import { RequestHandler } from "express";
import { IGetAllUsersUseCase } from "../../../../domain/interfaces/useCases/users/getAllUsers.usecase.interface";
import { IGetUserByIdUseCase } from "../../../../domain/interfaces/useCases/users/getUserById.usecase.interface";
import { IGetUserByEmailUseCase } from "../../../../domain/interfaces/useCases/users/getUserByEmail.usecase.interface";
import { IRegisterUserUseCase } from "../../../../domain/interfaces/useCases/users/registerUser.usecase.interface";
import { ILoginUserUseCase } from "../../../../domain/interfaces/useCases/users/loginUser.usecase.interface";
import { GetAllUsersResponseDTO } from "../../../../application/dto/users/getAllUsers.dto";
import {
  GetUserByIdRequestDTO,
  GetUserByIdResponseDTO,
} from "../../../../application/dto/users/getUserById.dto";
import {
  GetUserByEmailRequestDTO,
  GetUserByEmailResponseDTO,
} from "../../../../application/dto/users/getUserByEmail.dto";
import {
  RegisterUserRequestDTO,
  RegisterUserResponseDTO,
} from "../../../../application/dto/users/registerUser.dto";
import {
  LoginUserRequestDTO,
  LoginUserResponseDTO,
} from "../../../../application/dto/users/loginUser.dto";

export class UserController {
  constructor(
    private readonly getAllUsersUseCase: IGetAllUsersUseCase,
    private readonly getUserByIdUseCase: IGetUserByIdUseCase,
    private readonly getUserByEmailUseCase: IGetUserByEmailUseCase,
    private readonly registerUserUseCase: IRegisterUserUseCase,
    private readonly loginUserUseCase: ILoginUserUseCase,
  ) {}

  getAllUsers: RequestHandler<
    {}, 
    GetAllUsersResponseDTO[]
  > = async (_req, res) => {
    const result = await this.getAllUsersUseCase.execute();
    res.status(200).json(result);
  };

  getUserById: RequestHandler<
    GetUserByIdRequestDTO, 
    GetUserByIdResponseDTO
  > = async (req, res) => {
    const result = await this.getUserByIdUseCase.execute(req.params);
    res.status(200).json(result);
  };

  getUserByEmail: RequestHandler<
    GetUserByEmailRequestDTO,
    GetUserByEmailResponseDTO
  > = async (req, res) => {
    const result = await this.getUserByEmailUseCase.execute(req.params);
    res.status(200).json(result);
  };

  registerUser: RequestHandler<
    {}, 
    RegisterUserResponseDTO, 
    RegisterUserRequestDTO
  > = async (req, res) => {
    const result = await this.registerUserUseCase.execute(req.body);
    res.status(201).json(result);
  };

  loginUser: RequestHandler<
    {}, 
    LoginUserResponseDTO, 
    LoginUserRequestDTO
  > = async (req, res) => {
    const result = await this.loginUserUseCase.execute(req.body);
    res.status(200).json(result);
  };
}
