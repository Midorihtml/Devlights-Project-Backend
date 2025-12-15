import { PacienteModel } from "../models/pacienteSchema";
import type { IPaciente } from "../models/pacienteSchema";
import type { IPacienteRepository } from "../interfaces/IPacienteRepository";

/**
 * Repositorio Mongo para Pacientes.
 */
export class MongoPacienteRepository implements IPacienteRepository {
  async findAll(search?: string): Promise<IPaciente[]> {
    if (search) {
      return PacienteModel.find({
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { doctor: { $regex: search, $options: "i" } },
          { insurance: { $regex: search, $options: "i" } },
        ],
      });
    }
    return PacienteModel.find();
  }

  async findById(id: string): Promise<IPaciente | null> {
    return PacienteModel.findById(id);
  }

  async create(data: Partial<IPaciente>): Promise<IPaciente> {
    const paciente = new PacienteModel(data);
    return paciente.save();
  }

  async delete(id: string): Promise<void> {
    await PacienteModel.findByIdAndDelete(id);
  }
}
