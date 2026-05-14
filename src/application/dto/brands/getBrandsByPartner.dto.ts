export interface GetBrandsByPartnerRequestDTO {
  partnerId: string;
}

export interface GetBrandsByPartnerResponseDTO {
  id: string;
  name: string;
  partnerId: string;
  active: boolean;
}
