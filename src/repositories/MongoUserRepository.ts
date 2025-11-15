import { User, type IUser } from "../models/userSchema.ts";
import type { TUser } from "../services/AuthServices.ts";

export interface IUserRepository {
  createUser: (newUser: TUser) => Promise<IUser>;
  //   findByEmail(email: string): Promise<IUser | null>;
  //   updateUser(id: string, update: Partial<IUser>): Promise<IUser | null>;
  //   deleteUser(id: string): Promise<boolean>;
}

export class UserRepository implements IUserRepository {
  createUser = async (newUser: TUser): Promise<IUser> => {
    return await User.create(newUser);
  };

  //   async findByEmail(email: string): Promise<IUser | null> {
  //     return await User.findOne({ email });
  //   }

  //   async updateUser(id: string, update: Partial<IUser>): Promise<IUser | null> {
  //     return await User.findByIdAndUpdate(id, update, { new: true });
  //   }

  //   async deleteUser(id: string): Promise<boolean> {
  //     const result = await User.findByIdAndDelete(id);
  //     return !!result;
  //   }
}
