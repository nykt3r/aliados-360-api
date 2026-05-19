export interface GetAllUsersResponseDTO {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  active: boolean;
}
