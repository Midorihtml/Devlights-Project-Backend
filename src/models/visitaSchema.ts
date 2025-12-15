import { Schema, model, Document } from "mongoose";

/**
 * Interfaz para una Visita médica.
 */
export interface IVisita extends Document {
  patientId: string;
  date: Date;
  protocol: string;
  diagnosisType: string;
  diagnosis: string;
  description: string;
  status: "Pendiente" | "Pago";
  amount: number;
  doctor: string;
}

/**
 * Esquema de Mongoose para Visita.
 */
const VisitaSchema = new Schema<IVisita>({
  patientId: { type: String, required: true },
  date: { type: Date, required: true },
  protocol: { type: String, required: true },
  diagnosisType: { type: String, required: true },
  diagnosis: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["Pendiente", "Pago"], required: true },
  amount: { type: Number, required: true },
  doctor: { type: String, required: true },
});

export const VisitaModel = model<IVisita>("Visita", VisitaSchema);
