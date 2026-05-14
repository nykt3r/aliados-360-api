export interface GetContactsByPartnerRequestDTO {
  partnerId: string;
}

export interface GetContactsByPartnerResponseDTO {
  id: string;
  name: string;
  email: string;
  role: string;
  partnerId: string;
}
