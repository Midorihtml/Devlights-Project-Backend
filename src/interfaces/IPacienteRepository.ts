import type { IPaciente } from "../models/pacienteSchema";

/**
 * Interfaz para el repositorio de Pacientes.
 */
export interface IPacienteRepository {
  findAll(search?: string): Promise<IPaciente[]>;
  findById(id: string): Promise<IPaciente | null>;
  create(data: Partial<IPaciente>): Promise<IPaciente>;
  delete(id: string): Promise<void>;
}
