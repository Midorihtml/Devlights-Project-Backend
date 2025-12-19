import type { IVisita } from "../models/visitaSchema.js";

/**
 * Interfaz para el repositorio de Visitas.
 */
export interface IVisitaRepository {
  findByPatientId(patientId: string): Promise<IVisita[]>;
  create(data: Partial<IVisita>): Promise<IVisita>;
}
