import { Request, Response } from "express";
import { IGetProductByIdUseCase } from "../../../../domain/interfaces/useCases/products/getProductById.usecase.interface";
import { IGetProductsByBrandUseCase } from "../../../../domain/interfaces/useCases/products/getProductsByBrand.usecase.interface";
import { ICreateProductUseCase } from "../../../../domain/interfaces/useCases/products/createProduct.usecase.interface";
import {
  GetProductByIdRequestDTO,
  GetProductByIdResponseDTO,
} from "../../../../application/dto/products/getProductById.dto";
import {
  GetProductsByBrandRequestDTO,
  GetProductsByBrandResponseDTO,
} from "../../../../application/dto/products/getProductsByBrand.dto";
import {
  CreateProductRequestDTO,
  CreateProductResponseDTO,
} from "../../../../application/dto/products/createProduct.dto";

export class ProductController {
  constructor(
    private readonly getProductByIdUseCase: IGetProductByIdUseCase,
    private readonly getProductsByBrandUseCase: IGetProductsByBrandUseCase,
    private readonly createProductUseCase: ICreateProductUseCase,
  ) {}

  getProductById = async (
    req: Request<GetProductByIdRequestDTO>,
    res: Response<GetProductByIdResponseDTO>,
  ): Promise<void> => {
    const result = await this.getProductByIdUseCase.execute(req.params);
    res.status(200).json(result);
  };

  getProductsByBrand = async (
    req: Request<GetProductsByBrandRequestDTO>,
    res: Response<GetProductsByBrandResponseDTO[]>,
  ): Promise<void> => {
    const result = await this.getProductsByBrandUseCase.execute(req.params);
    res.status(200).json(result);
  };

  createProduct = async (
    req: Request<{}, CreateProductResponseDTO, CreateProductRequestDTO>,
    res: Response<CreateProductResponseDTO>,
  ): Promise<void> => {
    const result = await this.createProductUseCase.execute(req.body);
    res.status(201).json(result);
  };
}
