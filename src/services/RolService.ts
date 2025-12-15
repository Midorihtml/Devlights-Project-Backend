import type { IRol } from "../models/rolSchema";
import type { IRolRepository } from "../interfaces/IRolRepository";

/**
 * Servicio para la gestión de roles.
 */
export class RolService {
  constructor(private repo: IRolRepository) {}

  /**
   * Listar todos los roles.
   */
  async listarRoles(): Promise<IRol[]> {
    return this.repo.findAll();
  }

  /**
   * Crear un nuevo rol.
   */
  async crearRol(data: Partial<IRol>): Promise<IRol> {
    return this.repo.create(data);
  }

  /**
   * Eliminar un rol por ID.
   */
  async eliminarRol(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
