import { TurnoModel } from "../models/turnoSchema";
import type { ITurno } from "../models/turnoSchema";
import type { ITurnoRepository } from "../interfaces/ITurnoRepository";

/**
 * Repositorio Mongo para Turnos.
 */
export class MongoTurnoRepository implements ITurnoRepository {
  async findByDate(date: string): Promise<ITurno[]> {
    return TurnoModel.find({ date });
  }

  async create(data: Partial<ITurno>): Promise<ITurno> {
    const turno = new TurnoModel(data);
    return turno.save();
  }
}
