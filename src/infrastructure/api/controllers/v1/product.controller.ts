import { RequestHandler } from "express";
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

  getProductById: RequestHandler<
    GetProductByIdRequestDTO,
    GetProductByIdResponseDTO
  > = async (req, res) => {
    const result = await this.getProductByIdUseCase.execute(req.params);
    res.status(200).json(result);
  };

  getProductsByBrand: RequestHandler<
    GetProductsByBrandRequestDTO,
    GetProductsByBrandResponseDTO[]
  > = async (req, res) => {
    const result = await this.getProductsByBrandUseCase.execute(req.params);
    res.status(200).json(result);
  };

  createProduct: RequestHandler<
    { brandId: string },
    CreateProductResponseDTO,
    CreateProductRequestDTO
  > = async (req, res) => {
    const request: CreateProductRequestDTO = {
      id: req.body.id,
      name: req.body.name,
      brandId: req.params.brandId,
      active: req.body.active,
    };
    const result = await this.createProductUseCase.execute(request);
    res.status(201).json(result);
  };
}
