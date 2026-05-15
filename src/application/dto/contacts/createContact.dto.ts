export interface CreateContactRequestDTO {
  id?: string;
  name: string;
  email: string;
  role: string;
  partnerId: string;
}

export interface CreateContactResponseDTO {
  id: string;
  name: string;
  email: string;
  role: string;
  partnerId: string;
}
