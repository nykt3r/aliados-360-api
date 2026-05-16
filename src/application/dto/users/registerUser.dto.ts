export interface RegisterUserRequestDTO {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface RegisterUserResponseDTO {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  message: string;
}
