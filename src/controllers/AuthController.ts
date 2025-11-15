import type { Request, Response, NextFunction } from "express";
import type { AuthService } from "../services/AuthServices.ts";

export class AuthController {
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  getAll = (req: Request, res: Response, next: NextFunction) => {
    res.send("holaaaa");
  };

  login = (req: Request, res: Response, next: NextFunction) => {};
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, name, lastname } = req.body;
      if (!email || !password || !name || !lastname)
        res.status(400).send({
          msg: "Datos incompletos.",
          codigo: 400,
          data: [],
        });

      const newUser = await this.authService.register(req.body);

      if (!newUser) {
        next({
          message: "No se pudo registrar el usuario",
          context: req.body,
        });
        res.status(500).send({
          msg: "No se pudo registrar el usuario.",
          codigo: 500,
          data: [],
        });
      }
      return res.status(201).send({
        msg: "Usuario registrado correctamente.",
        codigo: 201,
        data: [],
      });
    } catch (error: any) {
      next({ message: error.message, context: { saludo: "hola" } });
      res.status(500).send({
        msg: error.message,
        codigo: 500,
        data: [],
      });
    }
  };
  forgot = (req: Request, res: Response, next: NextFunction) => {};
  changePassword = (req: Request, res: Response, next: NextFunction) => {};
  delete = (req: Request, res: Response, next: NextFunction) => {};
}
