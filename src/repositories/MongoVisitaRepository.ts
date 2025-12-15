import { VisitaModel } from "../models/visitaSchema";
import type { IVisita } from "../models/visitaSchema";
import type { IVisitaRepository } from "../interfaces/IVisitaRepository";

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
