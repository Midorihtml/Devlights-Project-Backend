import { Router } from "express";
import { TurnoController } from "../controllers/TurnoController";
import { requireAdmin } from "../middlewares/requireRole";

const router = Router();

// Listar turnos (ADMIN y CUSTOMER)
router.get("/turnos", TurnoController.listar);
// Crear turno (solo ADMIN)
router.post("/turnos", requireAdmin, TurnoController.crear);

export { router as turnoRouter };
