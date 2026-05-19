import { User } from "../../../domain/entities/user.entity";
import { UniqueId } from "../../../domain/valueObjects/uniqueId.vo";
import { Email } from "../../../domain/valueObjects/email.vo";
import { UserRole } from "../../../domain/enums/userRole.enum";

export interface UserPrimitives {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  active: boolean;
}

export class UserMapper {
  static toDomain(data: UserPrimitives): User {
    return new User(
      new UniqueId(data.id),
      data.name,
      new Email(data.email),
      data.passwordHash,
      this.mapRole(data.role),
      data.active,
    );
  }

  static toPersistence(user: User): UserPrimitives {
    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      passwordHash: user.getPasswordHash(),
      role: user.getRole(),
      active: user.isActive(),
    };
  }

  private static mapRole(role: string): UserRole {
    if (!Object.values(UserRole).includes(role as UserRole)) {
      throw new Error(`Invalid user role: ${role}`);
    }

    return role as UserRole;
  }
}
