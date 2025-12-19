import type { TUser } from "../types/TUser.js";
import type { IUser } from "./IUser.js";

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
