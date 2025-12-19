import { Router } from "express";
import { PacienteController } from "../controllers/PacienteController";
import { VisitaController } from "../controllers/VisitaController";
import { requireAdmin } from "../middlewares/requireRole";

const router = Router();

// Listar pacientes (ADMIN y CUSTOMER)
router.get("/", PacienteController.listar);
// Detalle paciente por Email (ADMIN y CUSTOMER)
router.get("/email/:email", PacienteController.detallePorEmail);
// Detalle paciente (ADMIN y CUSTOMER)
router.get("/:id", PacienteController.detalle);
// Listar visitas por paciente (ADMIN y CUSTOMER)
router.get("/:id/visitas", VisitaController.listarPorPaciente);
// Crear paciente (solo ADMIN)
router.post("/", requireAdmin, PacienteController.crear);
// Eliminar paciente (solo ADMIN)
router.delete("/:id", requireAdmin, PacienteController.eliminar);

export { router as pacienteRouter };
