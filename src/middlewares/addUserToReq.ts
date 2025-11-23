import { MongoUserRepository } from "@src/repositories/MongoUserRepository";
import type { Request, Response, NextFunction } from "express";

export async function addUserToReq(req: Request, _res: Response, next: NextFunction) {
  const _id = req.user?._id?.toString();
  if (!_id) return next();
  const userRepository = new MongoUserRepository();
  const user = await userRepository.findById(_id);
  if (!user) return next();
  req.user = Object.assign(req.user || {}, user);
  next();
}
