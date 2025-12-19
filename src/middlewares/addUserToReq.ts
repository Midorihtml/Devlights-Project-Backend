import { JWTException } from "../exceptions/index.js";
import { JWTBuilder } from "../lib/JWTBuilder.js";
import { MongoUserRepository } from "../repositories/MongoUserRepository.js";
import type { Request, Response, NextFunction } from "express";

export async function addUserToReq(req: Request, _res: Response, next: NextFunction) {
  const token = req.token || "";
  if (!token) {
    req.user = null;
    next();
    return;
  }
  const { sub: id } = JWTBuilder.decode(token);
  if (!id) throw new JWTException("Token inválido.");
  const userRepository = new MongoUserRepository();
  const user = (await userRepository.findById(id))?.toObject();
  if (!user) {
    req.user = null;
    next();
    return;
  }
  req.user = Object.assign(req.user || {}, { ...user, _id: user._id?.toString() });
  next();
}
