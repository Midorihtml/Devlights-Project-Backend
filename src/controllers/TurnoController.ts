import type { Request, Response, NextFunction } from "express";
import { TurnoService } from "../services/TurnoService";
import { MongoTurnoRepository } from "../repositories/MongoTurnoRepository";

const turnoService = new TurnoService(new MongoTurnoRepository());

/**
 * Controlador para operaciones de Turnos.
 */
export class TurnoController {
  /**
   * Listar turnos por fecha.
   */
  static async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const date = typeof req.query["date"] === "string" ? req.query["date"] : undefined;
      const turnos = await turnoService.listarTurnosPorFecha(date ?? "");
      res.json(turnos);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Crear turno.
   */
  static async crear(req: Request, res: Response, next: NextFunction) {
    try {
      const turno = await turnoService.crearTurno(req.body);
      res.status(201).json(turno);
    } catch (err) {
      next(err);
    }
  }
}
