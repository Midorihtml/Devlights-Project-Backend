import { Router } from "express";

import { AuthController } from "@src/controllers/AuthController";
import { MongoUserRepository } from "@src/repositories/MongoUserRepository";
import { AuthService } from "@src/services/AuthService";

const authRouter = Router();

const authRepository = new MongoUserRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRouter.get("/", authController.findAll);
authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.post("/forgot", authController.forgot);
authRouter.put("/change-password", authController.changePassword);
authRouter.delete("/", authController.delete);

export { authRouter };
