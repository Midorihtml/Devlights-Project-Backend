import type { Request, Response, NextFunction } from "express";
import { PacienteService } from "../services/PacienteService";
import { MongoPacienteRepository } from "../repositories/MongoPacienteRepository";
import { VisitaService } from "../services/VisitaService";
import { MongoVisitaRepository } from "../repositories/MongoVisitaRepository";
import type { IUser } from "../interfaces/IUser";

const pacienteService = new PacienteService(new MongoPacienteRepository());
const visitaService = new VisitaService(new MongoVisitaRepository());

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
      const firstName =
        typeof req.query["firstName"] === "string" ? req.query["firstName"] : undefined;
      const lastName =
        typeof req.query["lastName"] === "string" ? req.query["lastName"] : undefined;
      const page = typeof req.query["page"] === "string" ? parseInt(req.query["page"]) : 1;
      const limit = typeof req.query["limit"] === "string" ? parseInt(req.query["limit"]) : 10;

      const options = {
        ...(search !== undefined && { search }),
        ...(firstName !== undefined && { firstName }),
        ...(lastName !== undefined && { lastName }),
        page,
        limit,
      };

      const result = await pacienteService.listarPacientes(options);

      const enrichedData = await Promise.all(
        result.data.map(async (paciente) => {
          const visits = await visitaService.listarVisitasPorPaciente(paciente._id as string);
          const lastVisit =
            visits.length > 0 && visits[0]
              ? visits.reduce(
                  (max, current) => (current.date > max ? current.date : max),
                  visits[0].date,
                )
              : null;
          return { ...paciente.toObject(), lastVisit };
        }),
      );

      res.json({ ...result, data: enrichedData });
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
      if (!id) {
        res.status(400).json({ message: "ID inválido" });
        return;
      }
      const paciente = await pacienteService.obtenerPaciente(id);
      if (!paciente) {
        res.status(404).json({ message: "Paciente no encontrado" });
        return;
      }

      const visits = await visitaService.listarVisitasPorPaciente(paciente._id as string);
      const lastVisit =
        visits.length > 0 && visits[0]
          ? visits.reduce(
              (max, current) => (current.date > max ? current.date : max),
              visits[0].date,
            )
          : null;

      res.json({ ...paciente.toObject(), lastVisit });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Obtener detalles de un paciente por Email, incluyendo visitas.
   */
  static async detallePorEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const email = typeof req.params["email"] === "string" ? req.params["email"] : undefined;
      if (!email) {
        res.status(400).json({ message: "Email inválido" });
        return;
      }

      const paciente = await pacienteService.obtenerPacientePorEmail(email);
      if (!paciente) {
        res.status(404).json({ message: "Paciente no encontrado" });
        return;
      }

      const visits = await visitaService.listarVisitasPorPaciente(paciente._id as string);
      const lastVisit =
        visits.length > 0 && visits[0]
          ? visits.reduce(
              (max, current) => (current.date > max ? current.date : max),
              visits[0].date,
            )
          : null;

      res.json({ ...paciente.toObject(), visits, lastVisit });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Crear paciente.
   */
  static async crear(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as IUser;
      const doctorName = `${user.name} ${user.lastname}`;

      const pacienteData = {
        ...req.body,
        doctor: doctorName,
      };

      const paciente = await pacienteService.crearPaciente(pacienteData);
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
      if (!id) {
        res.status(400).json({ message: "ID inválido" });
        return;
      }
      await pacienteService.eliminarPaciente(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
