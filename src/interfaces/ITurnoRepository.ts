import type { ITurno } from "../models/turnoSchema";

/**
 * Interfaz para el repositorio de Turnos.
 */
export interface ITurnoRepository {
  findByDate(date: string): Promise<ITurno[]>;
  create(data: Partial<ITurno>): Promise<ITurno>;
}
