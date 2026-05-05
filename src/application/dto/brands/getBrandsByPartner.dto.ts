export interface GetBrandsByPartnerRequestDTO {
  partnerId: string;
}

export interface GetBrandsByPartnerResponseDTO {
  brands: {
    id: string;
    name: string;
    partnerId: string;
    active: boolean;
  }[];
}