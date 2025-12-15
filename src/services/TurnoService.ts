import type { ITurno } from "../models/turnoSchema";
import type { ITurnoRepository } from "../interfaces/ITurnoRepository";

/**
 * Servicio para la gestión de turnos.
 */
export class TurnoService {
  constructor(private repo: ITurnoRepository) {}

  /**
   * Listar turnos por fecha.
   */
  async listarTurnosPorFecha(date: string): Promise<ITurno[]> {
    return this.repo.findByDate(date);
  }

  /**
   * Crear un nuevo turno.
   */
  async crearTurno(data: Partial<ITurno>): Promise<ITurno> {
    return this.repo.create(data);
  }
}
