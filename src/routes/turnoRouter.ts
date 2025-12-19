import { Router } from "express";
import { TurnoController } from "../controllers/TurnoController";
import { requireAuth } from "../middlewares/requireRole";

const router = Router();

// Listar turnos (ADMIN y CUSTOMER)
router.get("/", TurnoController.listar);
// Crear turno (ADMIN y CUSTOMER)
router.post("/", requireAuth, TurnoController.crear);

export { router as turnoRouter };
