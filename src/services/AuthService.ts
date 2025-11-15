import bcrypt from "bcryptjs";
import type { IUserRepository } from "@src/interfaces/IUserRepository";
import type { TUser } from "@src/types/TUser";

export class AuthService {
  userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  findAll = () => {
    return this.userRepository.findAll();
  };

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
