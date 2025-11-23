import { Router } from "express";

import { AuthController } from "@src/controllers/AuthController";
import { MongoUserRepository } from "@src/repositories/MongoUserRepository";
import { AuthService } from "@src/services/AuthService";
import { validateToken } from "@src/middlewares/validateJWT";
import { addUserToReq } from "@src/middlewares/addUserToReq";

const authRouter = Router();

const authRepository = new MongoUserRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

// rutas publicas
authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.post("/forgot", authController.forgot);

// rutas protegidas
authRouter.post("/refresh", validateToken("REFRESH"), authController.refresh);
authRouter.patch(
  "/reset-password",
  [addUserToReq, validateToken("FORGOT")],
  authController.resetPassword,
);
authRouter.use(validateToken("ACCESS"));
authRouter.use(addUserToReq);

authRouter.get("/", authController.findAll);
authRouter.patch("/", authController.update);
authRouter.patch("/change-password", authController.changePassword);
authRouter.delete("/", authController.delete);

export { authRouter };
