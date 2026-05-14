export interface CreateProductRequestDTO {
  name: string
  brandId: string
}

export interface CreateProductResponseDTO {
  id: string
  name: string
  brandId: string
  active: boolean
}