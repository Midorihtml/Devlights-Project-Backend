import type { Request, Response, NextFunction } from "express";
import { VisitaService } from "../services/VisitaService";
import { MongoVisitaRepository } from "../repositories/MongoVisitaRepository";
import type { IUser } from "../interfaces/IUser";

const visitaService = new VisitaService(new MongoVisitaRepository());

/**
 * Controlador para operaciones de Visitas.
 */
export class VisitaController {
  /**
   * Listar visitas de un paciente.
   */
  static async listarPorPaciente(req: Request, res: Response, next: NextFunction) {
    try {
      const id = typeof req.params["id"] === "string" ? req.params["id"] : undefined;
      if (!id) {
        res.status(400).json({ message: "ID inválido" });
        return;
      }
      const visitas = await visitaService.listarVisitasPorPaciente(id);
      res.json(visitas);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Crear visita.
   */
  static async crear(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as IUser;
      const doctorName = `${user.name} ${user.lastname}`;

      const visitaData = {
        ...req.body,
        doctor: doctorName,
      };

      const visita = await visitaService.crearVisita(visitaData);
      res.status(201).json(visita);
    } catch (err) {
      next(err);
    }
  }
}
