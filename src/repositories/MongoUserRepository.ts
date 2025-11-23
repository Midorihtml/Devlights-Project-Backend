import type { IUserRepository } from "@src/interfaces/IUserRepository";
import type { IUser } from "@src/interfaces/IUser";
import { User } from "@src/models/userSchema";
import type { TUser } from "@src/types/TUser";

export class MongoUserRepository implements IUserRepository {
  findAll = async () => {
    return await User.find({}, { _id: 1, name: 1, lastname: 1, email: 1, deletedAt: 1 });
  };

  findById = async (_id: string) => {
    return await User.findById({ _id });
  };

  createUser = async (newUser: TUser): Promise<IUser> => {
    return await User.create(newUser);
  };

  findPasswordByEmail = async (email: string) => {
    return (await User.findOne({ email }, { password: 1 }))?.password || "";
  };

  findByEmail = async (email: string): Promise<IUser | null> => {
    return await User.findOne({ email });
  };

  changePassword = async (id: string, update: Partial<IUser>): Promise<boolean> => {
    return Boolean(await User.findByIdAndUpdate(id, update));
  };

  update = async (id: string, update: Partial<IUser>): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(id, update, { new: true });
  };

  delete = async (id: string): Promise<boolean> => {
    return Boolean(await User.findByIdAndUpdate(id, { deletedAt: new Date() }));
  };
}
