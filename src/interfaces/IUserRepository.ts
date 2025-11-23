import type { TUser } from "@src/types/TUser";
import type { IUser } from "@src/interfaces/IUser";

export interface IUserRepository {
  findAll: () => Promise<IUser[]>;
  createUser: (newUser: TUser) => Promise<IUser>;
  findPasswordByEmail: (email: string) => Promise<string>;
  findByEmail: (email: string) => Promise<IUser | null>;
  update: (id: string, update: Partial<IUser>) => Promise<IUser | null>;
  delete: (id: string) => Promise<boolean>;
}
