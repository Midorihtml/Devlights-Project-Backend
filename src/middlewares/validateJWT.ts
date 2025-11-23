import type { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "@src/exceptions";
import { JWTBuilder } from "@src/lib/JWTBuilder";

export function extractJWT(req: Request, _res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization || "";
  if (!authorizationHeader) throw new UnauthorizedException("Token inválido.");

  const token = authorizationHeader?.startsWith("Bearer ")
    ? authorizationHeader.replace("Bearer ", "")
    : null;

  req.token = token;
  next();
}

export function validateToken(typeJWT: "ACCESS" | "REFRESH") {
  return function (req: Request, _res: Response, next: NextFunction) {
    const token = req?.token || null;
    if (!token) throw new UnauthorizedException("Token inválido.");
    const { sub: id, exp, iat } = JWTBuilder.decode(token);
    if (!id || !exp || !iat) throw new UnauthorizedException("Token inválido.");
    if (exp - iat > Number(process.env[`JWT_${typeJWT}_TIME_EXP`]))
      throw new UnauthorizedException();
    req.user = { id };
    next();
  };
}
