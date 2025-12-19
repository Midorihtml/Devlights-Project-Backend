import { Router } from "express";
import { VisitaController } from "../controllers/VisitaController";
import { requireAdmin } from "../middlewares/requireRole";

const router = Router();

// Listar visitas por paciente (movido a pacienteRouter)

// Crear visita (solo ADMIN)
router.post("/", requireAdmin, VisitaController.crear);

export { router as visitaRouter };
