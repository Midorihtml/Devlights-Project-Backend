import type { Request, Response, NextFunction } from "express";
import { TurnoService } from "../services/TurnoService.js";
import { MongoTurnoRepository } from "../repositories/MongoTurnoRepository.js";
import { PacienteService } from "../services/PacienteService.js";
import { MongoPacienteRepository } from "../repositories/MongoPacienteRepository.js";

const turnoService = new TurnoService(new MongoTurnoRepository());
const pacienteService = new PacienteService(new MongoPacienteRepository());

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
      const month = typeof req.query["month"] === "string" ? req.query["month"] : undefined;

      let turnos;
      if (month) {
        turnos = await turnoService.listarTurnosPorMes(month);
      } else {
        turnos = await turnoService.listarTurnosPorFecha(date ?? "");
      }
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
      const { patientId } = req.body;
      let patientName = undefined;

      if (patientId) {
        const paciente = await pacienteService.obtenerPaciente(patientId);
        if (paciente) {
          patientName = `${paciente.firstName} ${paciente.lastName}`;
        }
      }

      const turnoData = {
        ...req.body,
        patientName,
      };

      const turno = await turnoService.crearTurno(turnoData);
      res.status(201).json(turno);
    } catch (err) {
      next(err);
    }
  }
}
