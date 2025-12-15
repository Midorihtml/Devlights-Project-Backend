import { Router } from "express";
import { VisitaController } from "../controllers/VisitaController";
import { requireAdmin } from "../middlewares/requireRole";

const router = Router();

// Listar visitas por paciente (ADMIN y CUSTOMER)
router.get("/pacientes/:id/visitas", VisitaController.listarPorPaciente);
// Crear visita (solo ADMIN)
router.post("/visitas", requireAdmin, VisitaController.crear);

export { router as visitaRouter };
