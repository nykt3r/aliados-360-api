export interface GetProductByIdRequestDTO {
  id: string;
}

export interface GetProductByIdResponseDTO {
  id: string;
  name: string;
  brandId: string;
  active: boolean;
}
