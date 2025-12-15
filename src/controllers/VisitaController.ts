import type { Request, Response, NextFunction } from "express";
import { VisitaService } from "../services/VisitaService";
import { MongoVisitaRepository } from "../repositories/MongoVisitaRepository";

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
      if (!id) return res.status(400).json({ message: "ID inválido" });
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
      const visita = await visitaService.crearVisita(req.body);
      res.status(201).json(visita);
    } catch (err) {
      next(err);
    }
  }
}
