import type { TUser } from "@src/types/TUser";
import type { IUser } from "@src/interfaces/IUser";

export interface IUserRepository {
  findAll: () => Promise<IUser[]>;
  findById: (_id: string) => Promise<IUser | null>;
  createUser: (newUser: TUser) => Promise<IUser>;
  findPasswordByEmail: (email: string) => Promise<string>;
  findByEmail: (email: string) => Promise<IUser | null>;
  changePassword: (id: string, update: Partial<IUser>) => Promise<boolean>;
  update: (id: string, update: Partial<IUser>) => Promise<IUser | null>;
  delete: (id: string) => Promise<boolean>;
}
