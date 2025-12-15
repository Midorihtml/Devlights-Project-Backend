import type { IVisita } from "../models/visitaSchema";
import type { IVisitaRepository } from "../interfaces/IVisitaRepository";

/**
 * Servicio para la gestión de visitas.
 */
export class VisitaService {
  constructor(private repo: IVisitaRepository) {}

  /**
   * Listar visitas de un paciente.
   */
  async listarVisitasPorPaciente(patientId: string): Promise<IVisita[]> {
    return this.repo.findByPatientId(patientId);
  }

  /**
   * Crear una nueva visita.
   */
  async crearVisita(data: Partial<IVisita>): Promise<IVisita> {
    return this.repo.create(data);
  }
}
