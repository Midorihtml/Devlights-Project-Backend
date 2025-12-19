import type { ITurno } from "../models/turnoSchema";
import type { ITurnoRepository } from "../interfaces/ITurnoRepository";
import { BadRequestException } from "../exceptions";

/**
 * Servicio para la gestión de turnos.
 */
export class TurnoService {
  constructor(private repo: ITurnoRepository) { }

  /**
   * Listar turnos por fecha.
   */
  async listarTurnosPorFecha(date: string): Promise<ITurno[]> {
    return this.repo.findByDate(date);
  }

  async listarTurnosPorMes(month: string): Promise<ITurno[]> {
    return this.repo.findByMonth(month);
  }

  /**
   * Crear un nuevo turno.
   */
  async crearTurno(data: Partial<ITurno>): Promise<ITurno> {
    if (data.date && data.hour) {
      const existingTurno = await this.repo.findByDateAndHour(data.date, data.hour);
      if (existingTurno) throw new BadRequestException("Turno no disponible");
    }
    return this.repo.create(data);
  }
}
