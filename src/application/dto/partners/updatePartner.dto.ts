export interface UpdatePartnerRequestDTO {
  id: string;
  name?: string;
  active?: boolean;
}

export interface UpdatePartnerResponseDTO {
  id: string;
  name: string;
  active: boolean;
}