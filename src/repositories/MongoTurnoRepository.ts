import { TurnoModel } from "../models/turnoSchema.js";
import type { ITurno } from "../models/turnoSchema.js";
import type { ITurnoRepository } from "../interfaces/ITurnoRepository.js";

/**
 * Repositorio Mongo para Turnos.
 */
export class MongoTurnoRepository implements ITurnoRepository {
  async findByDate(date: string): Promise<ITurno[]> {
    return TurnoModel.find({ date });
  }

  async findByMonth(month: string): Promise<ITurno[]> {
    return TurnoModel.find({ date: { $regex: new RegExp(`^${month}`) } });
  }

  async findByDateAndHour(date: string, hour: string): Promise<ITurno | null> {
    return TurnoModel.findOne({ date, hour });
  }

  async create(data: Partial<ITurno>): Promise<ITurno> {
    const turno = new TurnoModel(data);
    return turno.save();
  }
}
