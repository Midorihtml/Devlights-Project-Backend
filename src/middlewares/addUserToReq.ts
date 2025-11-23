import { JWTException } from "@src/exceptions";
import { JWTBuilder } from "@src/lib/JWTBuilder";
import { MongoUserRepository } from "@src/repositories/MongoUserRepository";
import type { Request, Response, NextFunction } from "express";

export async function addUserToReq(req: Request, _res: Response, next: NextFunction) {
  const token = req.token || "";
  const { sub: id } = JWTBuilder.decode(token);
  if (!id) throw new JWTException("Token inválido.");
  const userRepository = new MongoUserRepository();
  const user = await userRepository.findById(id);
  req.user = Object.assign(req.user || {}, user);
  next();
}
