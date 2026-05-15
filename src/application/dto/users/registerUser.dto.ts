export interface RegisterUserRequestDTO {
  id?: string;
  name: string;
  email: string;
  password: string;
  role?: string;
  active?: boolean;
}

export interface RegisterUserResponseDTO {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  message: string;
}
