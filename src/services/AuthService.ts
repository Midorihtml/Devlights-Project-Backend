import bcrypt from "bcryptjs";
import type { IUserRepository } from "@src/interfaces/IUserRepository";
import type { TUser } from "@src/types/TUser";
import { UnauthorizedException } from "@src/exceptions/UnauthorizedException";
import { JWTBuilder } from "@src/lib/JWTBuilder";
import type { IUser } from "@src/interfaces/IUser";
import { BadRequestException, DatabaseException } from "@src/exceptions";

export class AuthService {
  userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  findAll = () => {
    return this.userRepository.findAll();
  };

  login = async ({ email, password }: { email: string; password: string }) => {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new UnauthorizedException("Usuario y/o contraseña incorrecto/s.");

    const isLoged = bcrypt.compareSync(password, user?.password || "");
    if (!isLoged) throw new UnauthorizedException("Usuario y/o contraseña incorrecto/s.");

    const payload = {
      name: user.name,
      lastname: user.lastname,
      role: "admin",
    };

    const accessToken = new JWTBuilder()
      .setSubject(user?.id)
      .setExpiration("ACCESS")
      .setPayload(payload)
      .build();

    const refreshToken = new JWTBuilder()
      .setSubject(user?.id)
      .setExpiration("REFRESH")
      .setPayload(payload)
      .build();

    return {
      accessToken,
      refreshToken,
    };
  };

  register = (newUser: TUser) => {
    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(newUser.password, salt);

    return this.userRepository.createUser(newUser);
  };

  forgot = () => {};

  changePassword = async (
    id: string,
    password: string,
    newPassword: string,
    confirmPassword: string,
  ) => {
    const user = await this.userRepository.findById(id);
    if (!user) throw new DatabaseException("Usuario no encontrado", 404);
    const isAllowed = bcrypt.compareSync(password, user?.password || "");
    if (!isAllowed) throw new UnauthorizedException("Contraseña incorrecta.");
    if (newPassword !== confirmPassword)
      throw new BadRequestException("Las contraseñas no coinciden.");

    const salt = bcrypt.genSaltSync(10);
    const newPasswordHash = bcrypt.hashSync(newPassword, salt);
    return await this.userRepository.changePassword(id, { password: newPasswordHash });
  };

  update = (id: string, update: Partial<IUser>) => {
    return this.userRepository.update(id, update);
  };

  delete = (id: string) => {
    return this.userRepository.delete(id);
  };
}
