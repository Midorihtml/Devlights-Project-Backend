import type { IPaciente } from "../models/pacienteSchema";
import type { IPacienteRepository } from "../interfaces/IPacienteRepository";

/**
 * Servicio para la gestión de pacientes.
 */
export class PacienteService {
  constructor(private repo: IPacienteRepository) { }

  /**
   * Listar pacientes, opcionalmente filtrando por búsqueda.
   */
  async listarPacientes(options?: import("../interfaces/IPacienteRepository").PatientQueryOptions): Promise<import("../interfaces/IPacienteRepository").PatientListResult> {
    return this.repo.findAll(options);
  }

  /**
   * Obtener detalles de un paciente por ID.
   */
  async obtenerPaciente(id: string): Promise<IPaciente | null> {
    return this.repo.findById(id);
  }

  /**
   * Obtener detalles de un paciente por Email.
   */
  async obtenerPacientePorEmail(email: string): Promise<IPaciente | null> {
    return this.repo.findByEmail(email);
  }

  /**
   * Crear un nuevo paciente.
   */
  async crearPaciente(data: Partial<IPaciente>): Promise<IPaciente> {
    return this.repo.create(data);
  }

  /**
   * Eliminar un paciente por ID.
   */
  async eliminarPaciente(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
