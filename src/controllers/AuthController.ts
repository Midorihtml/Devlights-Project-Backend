import type { Request, Response } from "express";
import type { AuthService } from "../services/AuthService";
import {
  BadRequestException,
  DatabaseException,
  JWTException,
  UnauthorizedException,
} from "../exceptions";
import { StatusCode } from "../enums/StatusCode";
import { Roles } from "../enums/Roles";

export class AuthController {
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  findAll = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user || user.role !== Roles.ADMIN) throw new UnauthorizedException("No autorizado.", 403);
    const users = await this.authService.findAll();
    res.send({ code: StatusCode.OK, msg: "success", data: users });
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) throw new BadRequestException();
    const jwt = await this.authService.login({ email, password });
    res.send({ code: StatusCode.OK, msg: "success", data: jwt });
  };

  register = async (req: Request, res: Response) => {
    const { email, password, name, lastname } = req.body;
    if (!email || !password || !name || !lastname)
      throw new BadRequestException("Datos invalidos.");

    const newUser = await this.authService.register(req.body);
    if (!newUser) throw new DatabaseException("Error al registrar usuario.");

    res.status(StatusCode.Created).send({
      code: StatusCode.Created,
      msg: "Usuario registrado correctamente.",
      data: null,
    });
  };

  forgot = async (req: Request, res: Response) => {
    const { email } = req.body || "";
    if (!email) throw new BadRequestException("Email de recuperación requerido.");
    await this.authService.forgot(email);
    res.send({
      code: StatusCode.OK,
      msg: "Email de recuperación enviado correctamente.",
      data: null,
    });
  };

  resetPassword = async (req: Request, res: Response) => {
    const id = req.user?._id;
    const { newPassword, confirmPassword } = req.body;
    if (!id || typeof id !== "string") throw new UnauthorizedException("No autorizado.");
    if (!newPassword || !confirmPassword)
      throw new BadRequestException("Contraseña no definida o inválida.");

    const isUpdatedPassword = await this.authService.resetPassword(
      id,
      newPassword,
      confirmPassword,
    );

    if (!isUpdatedPassword) throw new DatabaseException("Error al actualizar contraseña.");

    res.send({
      code: StatusCode.OK,
      msg: "Contraseña actualizada correctamente",
      data: isUpdatedPassword,
    });
  };

  changePassword = async (req: Request, res: Response) => {
    const user = req.user;
    const { password, newPassword, confirmPassword } = req.body;

    if (!user || !user._id || !user.password || typeof user._id !== "string")
      throw new UnauthorizedException("No autorizado.");
    if (!password || !newPassword || !confirmPassword)
      throw new BadRequestException("Contraseña no definida o inválida.");

    const isUpdatedPassword = await this.authService.changePassword(
      user?._id,
      password,
      newPassword,
      confirmPassword,
      user?.password,
    );

    if (!isUpdatedPassword) throw new DatabaseException("Error al actualizar contraseña.");

    res.send({
      code: StatusCode.OK,
      msg: "Contraseña actualizada correctamente",
      data: isUpdatedPassword,
    });
  };

  refresh = async (req: Request, res: Response) => {
    const refreshToken = req.token;
    if (!refreshToken) throw new UnauthorizedException("Token inválido.");
    const newAccessJwt = await this.authService.refresh(refreshToken);
    if (!newAccessJwt) throw new JWTException("Error al generar token.");
    res.send({
      code: StatusCode.OK,
      msg: "Token de acceso generado correctamente",
      data: { accessToken: newAccessJwt },
    });
  };

  update = async (req: Request, res: Response) => {
    const id = req.user?._id || "";
    const { name, lastname } = req.body;

    if (!id || typeof id !== "string") throw new UnauthorizedException("No autorizado.");
    if (!name || !lastname) throw new BadRequestException("Nombre y apellido requeridos.");

    const updatedUser = await this.authService.update(id, { name, lastname });
    if (!updatedUser) throw new DatabaseException("Error al actualizar usuario.");
    res.send({ code: StatusCode.OK, msg: "Usuario actualizado correctamente.", data: updatedUser });
  };

  delete = async (req: Request, res: Response) => {
    const id = req.user?._id;
    if (!id || typeof id !== "string") throw new UnauthorizedException("No autorizado.");
    const isDeletedUser = await this.authService.delete(id);
    res.send({ code: StatusCode.OK, msg: "Usuario eliminado correctamente.", data: isDeletedUser });
  };
}
