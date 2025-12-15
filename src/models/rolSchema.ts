import { Schema, model, Document } from "mongoose";

/**
 * Interfaz para un Rol de usuario.
 */
export interface IRol extends Document {
  name: "ADMIN" | "CUSTOMER";
}

/**
 * Esquema de Mongoose para Rol.
 */
const RolSchema = new Schema<IRol>({
  name: { type: String, enum: ["ADMIN", "CUSTOMER"], required: true, unique: true },
});

export const RolModel = model<IRol>("Rol", RolSchema);
