import { User } from "../../entities/user.entity";

export interface IUserRepository {
  save(user: User): Promise<User | void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}
