import bcrypt from "bcryptjs";
import type { IUserRepository } from "@src/interfaces/IUserRepository";
import type { TUser } from "@src/types/TUser";
import { UnauthorizedException } from "@src/exceptions/UnauthorizedException";
import { JWTBuilder } from "@src/lib/JWTBuilder";
import type { IUser } from "@src/interfaces/IUser";
import { BadRequestException } from "@src/exceptions";

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

  forgot = async (email: string) => {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return;
    const forgotAccessToken = new JWTBuilder().setSubject(user?.id).setExpiration("FORGOT").build();
    // TODO implementar servicio de mailer para enviar el token
    // TODO de forgot y cambie su contraseña
    console.log(forgotAccessToken);
  };

  resetPassword = async (id: string, newPassword: string, confirmPassword: string) => {
    if (newPassword !== confirmPassword)
      throw new BadRequestException("Las contraseñas no coinciden.");

    const salt = bcrypt.genSaltSync(10);
    const newPasswordHash = bcrypt.hashSync(newPassword, salt);
    return await this.userRepository.changePassword(id, { password: newPasswordHash });
  };

  changePassword = async (
    id: string,
    password: string,
    newPassword: string,
    confirmPassword: string,
    currentPaswordHash: string,
  ) => {
    const isAllowed = bcrypt.compareSync(password, currentPaswordHash);
    if (!isAllowed) throw new UnauthorizedException("Contraseña incorrecta.");
    if (newPassword !== confirmPassword)
      throw new BadRequestException("Las contraseñas no coinciden.");

    const salt = bcrypt.genSaltSync(10);
    const newPasswordHash = bcrypt.hashSync(newPassword, salt);
    return await this.userRepository.changePassword(id, { password: newPasswordHash });
  };

  refresh = async (refreshToken: string) => {
    const decodedRefreshToken = JWTBuilder.decode(refreshToken);

    const newAccessToken = new JWTBuilder()
      .setPayload(decodedRefreshToken)
      .setExpiration("ACCESS")
      .build();

    return newAccessToken;
  };

  update = (id: string, update: Partial<IUser>) => {
    return this.userRepository.update(id, update);
  };

  delete = (id: string) => {
    return this.userRepository.delete(id);
  };
}
