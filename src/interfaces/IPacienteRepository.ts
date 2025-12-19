import type { IPaciente } from "../models/pacienteSchema.js";

/**
 * Interfaz para el repositorio de Pacientes.
 */
export interface PatientQueryOptions {
  search?: string;
  firstName?: string;
  lastName?: string;
  page?: number;
  limit?: number;
}

export interface PatientListResult {
  data: IPaciente[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface IPacienteRepository {
  findAll(options?: PatientQueryOptions): Promise<PatientListResult>;
  findById(id: string): Promise<IPaciente | null>;
  findByEmail(email: string): Promise<IPaciente | null>;
  create(data: Partial<IPaciente>): Promise<IPaciente>;
  delete(id: string): Promise<void>;
}
