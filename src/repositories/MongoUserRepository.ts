import type { IUserRepository } from "@src/interfaces/IUserRepository";
import type { IUser } from "@src/interfaces/IUser";
import { User } from "@src/models/userSchema";
import type { TUser } from "@src/types/TUser";

export class MongoUserRepository implements IUserRepository {
  findAll = async () => {
    return await User.find();
  };

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
