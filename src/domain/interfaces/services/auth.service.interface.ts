import { JwtPayload } from "../../../shared/types/jwtPayload.type";

export interface IAuthService {
  verifyToken(token: string): JwtPayload;
  generateToken(payload: JwtPayload): string;
}
