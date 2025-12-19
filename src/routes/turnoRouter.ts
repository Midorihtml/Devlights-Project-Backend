import { Router } from "express";
import { TurnoController } from "../controllers/TurnoController.js";
import { requireAuth } from "../middlewares/requireRole.js";

const router = Router();

// Listar turnos (ADMIN y CUSTOMER)
router.get("/", TurnoController.listar);
// Crear turno (ADMIN y CUSTOMER)
router.post("/", requireAuth, TurnoController.crear);

export { router as turnoRouter };
