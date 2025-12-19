import { RolModel } from "../models/rolSchema.js";
import type { IRol } from "../models/rolSchema.js";
import type { IRolRepository } from "../interfaces/IRolRepository.js";

/**
 * Repositorio Mongo para Roles.
 */
export class MongoRolRepository implements IRolRepository {
  async findAll(): Promise<IRol[]> {
    return RolModel.find();
  }

  async create(data: Partial<IRol>): Promise<IRol> {
    const rol = new RolModel(data);
    return rol.save();
  }

  async delete(id: string): Promise<void> {
    await RolModel.findByIdAndDelete(id);
  }
}
