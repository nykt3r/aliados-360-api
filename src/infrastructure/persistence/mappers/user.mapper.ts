import { User } from "../../../domain/entities/user.entity";
import { UniqueId } from "../../../domain/valueObjects/uniqueId.vo";
import { Email } from "../../../domain/valueObjects/email.vo";

export interface UserPrimitives {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  active: boolean;
}

export class UserMapper {
  static toDomain(data: UserPrimitives): User {
    return new User(
      new UniqueId(data.id),
      data.name,
      new Email(data.email),
      data.password,
      data.role,
      data.active,
    );
  }

  static toPersistence(user: User): UserPrimitives {
    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      role: user.getRole(),
      active: user.isActive(),
    };
  }
}
