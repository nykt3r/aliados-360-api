export interface CreateBrandRequestDTO {
  id?: string;
  name: string;
  partnerId: string;
  active?: boolean;
}

export interface CreateBrandResponseDTO {
  id: string;
  name: string;
  partnerId: string;
  active: boolean;
}
