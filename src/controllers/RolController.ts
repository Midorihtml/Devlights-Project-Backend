import type { Request, Response, NextFunction } from "express";
import { RolService } from "../services/RolService.js";
import { MongoRolRepository } from "../repositories/MongoRolRepository.js";

const rolService = new RolService(new MongoRolRepository());

/**
 * Controlador para operaciones de Roles.
 */
export class RolController {
  /**
   * Listar roles.
   */
  static async listar(_req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await rolService.listarRoles();
      res.json(roles);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Crear rol.
   */
  static async crear(req: Request, res: Response, next: NextFunction) {
    try {
      const rol = await rolService.crearRol(req.body);
      res.status(201).json(rol);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Eliminar rol.
   */
  static async eliminar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = typeof req.params["id"] === "string" ? req.params["id"] : undefined;
      if (!id) {
        res.status(400).json({ message: "ID inválido" });
        return;
      }
      await rolService.eliminarRol(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
