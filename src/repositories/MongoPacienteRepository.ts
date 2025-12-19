import { PacienteModel } from "../models/pacienteSchema";
import type { IPaciente } from "../models/pacienteSchema";
import type { IPacienteRepository } from "../interfaces/IPacienteRepository";

/**
 * Repositorio Mongo para Pacientes.
 */
export class MongoPacienteRepository implements IPacienteRepository {
  async findAll(options?: import("../interfaces/IPacienteRepository").PatientQueryOptions): Promise<import("../interfaces/IPacienteRepository").PatientListResult> {
    const { search, firstName, lastName, page = 1, limit = 10 } = options || {};
    const skip = (page - 1) * limit;
    const query: any = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { doctor: { $regex: search, $options: "i" } },
        { insurance: { $regex: search, $options: "i" } },
      ];
    }

    if (firstName) {
      query.firstName = { $regex: firstName, $options: "i" };
    }

    if (lastName) {
      query.lastName = { $regex: lastName, $options: "i" };
    }

    const [data, total] = await Promise.all([
      PacienteModel.find(query).skip(skip).limit(limit).sort({ lastName: 1, firstName: 1 }),
      PacienteModel.countDocuments(query),
    ]);

    return {
      data,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async findById(id: string): Promise<IPaciente | null> {
    return PacienteModel.findById(id);
  }

  async findByEmail(email: string): Promise<IPaciente | null> {
    return PacienteModel.findOne({ email });
  }

  async create(data: Partial<IPaciente>): Promise<IPaciente> {
    const paciente = new PacienteModel(data);
    return paciente.save();
  }

  async delete(id: string): Promise<void> {
    await PacienteModel.findByIdAndDelete(id);
  }
}
