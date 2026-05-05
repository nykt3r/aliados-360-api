export interface CreateBrandRequestDTO{
  name: string;
  partnerId: string;
}

export interface CreateBrandResponseDTO{
  id: string;
  name: string;
  partnerId: string;
  active: boolean;
}