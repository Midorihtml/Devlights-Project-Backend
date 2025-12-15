import type { Request, Response, NextFunction } from "express";
import { PacienteService } from "../services/PacienteService";
import { MongoPacienteRepository } from "../repositories/MongoPacienteRepository";

const pacienteService = new PacienteService(new MongoPacienteRepository());

/**
 * Controlador para operaciones de Pacientes.
 */
export class PacienteController {
  /**
   * Listar pacientes.
   */
  static async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const search = typeof req.query["search"] === "string" ? req.query["search"] : undefined;
      const pacientes = await pacienteService.listarPacientes(search);
      res.json(pacientes);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Obtener detalles de un paciente.
   */
  static async detalle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = typeof req.params["id"] === "string" ? req.params["id"] : undefined;
      if (!id) return res.status(400).json({ message: "ID inválido" });
      const paciente = await pacienteService.obtenerPaciente(id);
      if (!paciente) return res.status(404).json({ message: "Paciente no encontrado" });
      res.json(paciente);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Crear paciente.
   */
  static async crear(req: Request, res: Response, next: NextFunction) {
    try {
      const paciente = await pacienteService.crearPaciente(req.body);
      res.status(201).json(paciente);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Eliminar paciente.
   */
  static async eliminar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = typeof req.params["id"] === "string" ? req.params["id"] : undefined;
      if (!id) return res.status(400).json({ message: "ID inválido" });
      await pacienteService.eliminarPaciente(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
