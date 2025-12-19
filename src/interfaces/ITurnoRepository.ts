import type { ITurno } from "../models/turnoSchema";

/**
 * Interfaz para el repositorio de Turnos.
 */
export interface ITurnoRepository {
  findByDate(date: string): Promise<ITurno[]>;
  findByMonth(month: string): Promise<ITurno[]>;
  findByDateAndHour(date: string, hour: string): Promise<ITurno | null>;
  create(data: Partial<ITurno>): Promise<ITurno>;
}
