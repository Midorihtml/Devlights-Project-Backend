import { Schema, model, Document } from "mongoose";

/**
 * Interfaz para un Paciente.
 */
export interface IPaciente extends Document {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  dni: string;
  doctor: string;
  insurance: string;
  lastVisit?: Date;
}

/**
 * Esquema de Mongoose para Paciente.
 */
const PacienteSchema = new Schema<IPaciente>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  dni: { type: String, required: true, unique: true },
  doctor: { type: String, required: true },
  insurance: { type: String, required: true },
  lastVisit: { type: Date },
});

export const PacienteModel = model<IPaciente>("Paciente", PacienteSchema);
