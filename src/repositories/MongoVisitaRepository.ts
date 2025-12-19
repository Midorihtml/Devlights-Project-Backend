import { VisitaModel } from "../models/visitaSchema.js";
import type { IVisita } from "../models/visitaSchema.js";
import type { IVisitaRepository } from "../interfaces/IVisitaRepository.js";

/**
 * Repositorio Mongo para Visitas.
 */
export class MongoVisitaRepository implements IVisitaRepository {
  async findByPatientId(patientId: string): Promise<IVisita[]> {
    return VisitaModel.find({ patientId });
  }

  async create(data: Partial<IVisita>): Promise<IVisita> {
    const visita = new VisitaModel(data);
    return visita.save();
  }
}
