export interface GetUserByEmailRequestDTO {
  email: string;
}

export interface GetUserByEmailResponseDTO {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}
