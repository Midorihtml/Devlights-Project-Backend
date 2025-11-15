import { Router } from "express";
import { AuthController } from "../controllers/AuthController.ts";
import { AuthService } from "../services/AuthServices.ts";
import { UserRepository } from "../repositories/MongoUserRepository.ts";

const authRouter = Router();

const authRepository = new UserRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRouter.get("/", authController.getAll);
authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.post("/forgot", authController.forgot);
authRouter.put("/change-password", authController.changePassword);
authRouter.delete("/", authController.delete);

export { authRouter };
