export interface GetProductsByBrandRequestDTO {
  brandId: string;
}

export interface GetProductsByBrandResponseDTO {
  id: string;
  name: string;
  brandId: string;
  active: boolean;
}
