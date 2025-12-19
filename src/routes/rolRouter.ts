import { Router } from "express";
import { RolController } from "../controllers/RolController.js";
import { requireAdmin } from "../middlewares/requireRole.js";

const router = Router();

// Listar roles (solo ADMIN)
router.get("/roles", requireAdmin, RolController.listar);
// Crear rol (solo ADMIN)
router.post("/roles", requireAdmin, RolController.crear);
// Eliminar rol (solo ADMIN)
router.delete("/roles/:id", requireAdmin, RolController.eliminar);

export { router as rolRouter };
