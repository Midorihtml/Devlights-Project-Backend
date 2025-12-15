import { Schema, model, Document } from "mongoose";

/**
 * Interfaz para un Turno (Cita/Appointment).
 */
export interface ITurno extends Document {
  date: string; // YYYY-MM-DD
  hour: string; // HH:mm
  patientId?: string;
}

/**
 * Esquema de Mongoose para Turno.
 */
const TurnoSchema = new Schema<ITurno>({
  date: { type: String, required: true },
  hour: { type: String, required: true },
  patientId: { type: Schema.Types.ObjectId, ref: "Paciente" },
});

export const TurnoModel = model<ITurno>("Turno", TurnoSchema);
