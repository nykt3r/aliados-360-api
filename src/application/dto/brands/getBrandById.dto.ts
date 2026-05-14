export interface GetBrandByIdRequestDTO {
  id: string;
}

export interface GetBrandByIdResponseDTO {
  id: string;
  name: string;
  partnerId: string;
  active: boolean;
}
