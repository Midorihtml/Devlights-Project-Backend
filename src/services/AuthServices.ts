import bcrypt from "bcryptjs";
import type { IUserRepository } from "../repositories/MongoUserRepository.ts";

export type TUser = {
  name: string;
  lastname: string;
  email: string;
  password: string;
};

export class AuthService {
  userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  login = () => {};
  register = (newUser: TUser) => {
    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(newUser.password, salt);

    return this.userRepository.createUser(newUser);
  };
  forgot = () => {};
  update = () => {};
  delete = () => {};
}
