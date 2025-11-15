import type { TUser } from "@src/types/TUser";
import type { IUser } from "@src/interfaces/IUser";

export interface IUserRepository {
  findAll: () => Promise<IUser[]>;
  createUser: (newUser: TUser) => Promise<IUser>;

  //   findByEmail(email: string): Promise<IUser | null>;
  //   updateUser(id: string, update: Partial<IUser>): Promise<IUser | null>;
  //   deleteUser(id: string): Promise<boolean>;
}
