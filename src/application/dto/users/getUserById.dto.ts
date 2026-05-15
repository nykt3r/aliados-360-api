export interface GetUserByIdRequestDTO {
  id: string;
}

export interface GetUserByIdResponseDTO {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}
