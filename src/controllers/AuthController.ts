import type { Request, Response, NextFunction } from "express";
import type { AuthService } from "@src/services/AuthService";
import { BadRequestException } from "@src/exceptions/BadRequestException";
import { DatabaseException } from "@src/exceptions/DatabaseException";

export class AuthController {
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  findAll = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.authService.findAll();
      res.send({ code: 200, msg: "success", data: users });
    } catch (error) {
      next(error);
    }
  };

  login = (req: Request, res: Response, next: NextFunction) => {};

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, name, lastname } = req.body;
      if (!email || !password || !name || !lastname)
        throw new BadRequestException("Datos invalidos.");

      const newUser = await this.authService.register(req.body);
      if (!newUser) throw new DatabaseException("Error al registrar usuario.");

      res.status(201).send({
        code: 201,
        msg: "Usuario registrado correctamente.",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };
  forgot = (req: Request, res: Response, next: NextFunction) => {};
  changePassword = (req: Request, res: Response, next: NextFunction) => {};
  delete = (req: Request, res: Response, next: NextFunction) => {};
}
