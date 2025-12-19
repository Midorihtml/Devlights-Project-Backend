import type { IPaciente } from "../models/pacienteSchema.js";
import type { IVisita } from "../models/visitaSchema.js";
import type { ITurno } from "../models/turnoSchema.js";
import type { IRol } from "../models/rolSchema.js";

/**
 * Tipo para respuesta de listado de pacientes.
 */
export type TPacienteListResponse = IPaciente[];

/**
 * Tipo para respuesta de detalle de paciente.
 */
export type TPacienteDetailResponse = IPaciente;

/**
 * Tipo para respuesta de listado de visitas.
 */
export type TVisitaListResponse = IVisita[];

/**
 * Tipo para respuesta de listado de turnos.
 */
export type TTurnoListResponse = ITurno[];

/**
 * Tipo para respuesta de listado de roles.
 */
export type TRolListResponse = IRol[];
