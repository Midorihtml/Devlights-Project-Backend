import { Router } from "express";
import { PacienteController } from "../controllers/PacienteController";
import { requireAdmin } from "../middlewares/requireRole";

const router = Router();

// Listar pacientes (ADMIN y CUSTOMER)
router.get("/", PacienteController.listar);
// Detalle paciente (ADMIN y CUSTOMER)
router.get("/:id", PacienteController.detalle);
// Crear paciente (solo ADMIN)
router.post("/", requireAdmin, PacienteController.crear);
// Eliminar paciente (solo ADMIN)
router.delete("/:id", requireAdmin, PacienteController.eliminar);

export { router as pacienteRouter };
