import type { IRol } from "../models/rolSchema";

/**
 * Interfaz para el repositorio de Roles.
 */
export interface IRolRepository {
  findAll(): Promise<IRol[]>;
  create(data: Partial<IRol>): Promise<IRol>;
  delete(id: string): Promise<void>;
}
