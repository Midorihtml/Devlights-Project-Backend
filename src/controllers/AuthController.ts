import type { Request, Response, NextFunction } from "express";
import type { AuthService } from "@src/services/AuthService";
import {
  BadRequestException,
  DatabaseException,
  JWTException,
  UnauthorizedException,
} from "@src/exceptions";
import { StatusCode } from "@src/enums/StatusCode";

export class AuthController {
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  findAll = async (_req: Request, res: Response) => {
    const users = await this.authService.findAll();
    res.send({ code: StatusCode.OK, msg: "success", data: users });
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) throw new BadRequestException();
    const jwt = await this.authService.login({ email, password });
    res.send({ code: StatusCode.OK, msg: "success", data: jwt });
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
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

  changePassword = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { password, newPassword, confirmPassword } = req.body;
    if (!id) throw new BadRequestException("Identificador de usuario no definido o inválido.");
    if (!password || !newPassword || !confirmPassword)
      throw new BadRequestException("Contraseña no definida o inválida.");
    const isUpdatedPassword = await this.authService.changePassword(
      id,
      password,
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
    const { id } = req.params;
    const { name, lastname } = req.body;

    if (!id) throw new BadRequestException("Identificador de usuario no definido o inválido.");
    if (!name || !lastname) throw new BadRequestException("Nombre y apellido requeridos.");
    const updatedUser = await this.authService.update(id, { name, lastname });
    if (!updatedUser) throw new DatabaseException("Error al actualizar usuario.");
    res.send({ code: StatusCode.OK, msg: "Usuario actualizado correctamente.", data: updatedUser });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw new BadRequestException("Identificador de usuario no definido o inválido.");
    const isDeletedUser = await this.authService.delete(id);
    res.send({ code: StatusCode.OK, msg: "Usuario eliminado correctamente.", data: isDeletedUser });
  };
}
