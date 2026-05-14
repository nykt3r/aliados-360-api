export interface CreateProductRequestDTO {
  id?: string;
  name: string;
  brandId: string;
  active?: boolean;
}

export interface CreateProductResponseDTO {
  id: string;
  name: string;
  brandId: string;
  active: boolean;
}
