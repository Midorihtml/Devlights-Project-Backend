import type { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions";
import { JWTBuilder } from "../lib/JWTBuilder";

export function extractJWT(req: Request, _res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization || "";

  const token = authorizationHeader?.startsWith("Bearer ")
    ? authorizationHeader.replace("Bearer ", "")
    : null;

  req.token = token;
  next();
}

export function validateToken(typeJWT: "ACCESS" | "REFRESH" | "FORGOT") {
  return function (req: Request, _res: Response, next: NextFunction) {
    const token = req?.token || null;
    if (!token) throw new UnauthorizedException("Token inválido.");
    const { sub: id, exp, iat } = JWTBuilder.decode(token);
    if (!id || !exp || !iat) throw new UnauthorizedException("Token inválido.");
    if (typeJWT === "REFRESH" && exp - iat < Number(process.env["JWT_REFRESH_TIME_EXP"]))
      throw new UnauthorizedException("Token inválido.");
    if (exp - iat > Number(process.env[`JWT_${typeJWT}_TIME_EXP`]))
      throw new UnauthorizedException("Token inválido.");
    next();
  };
}
