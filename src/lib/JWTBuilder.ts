import jwt from "jsonwebtoken";
import { JWTException } from "../exceptions/JWTException";
import { UnauthorizedException } from "../exceptions";

export class JWTBuilder {
  private secretKey: string;
  private forgotTimeExp: number;
  private accessTimeExp: number;
  private refreshTimeExp: number;
  private payload: object;

  constructor() {
    this.secretKey = process.env["JWT_SECRET_KEY"] || "";
    this.forgotTimeExp = Number(process.env["JWT_JWT_FORGOT_TIME_EXP"]) || 900; // 15m
    this.accessTimeExp = Number(process.env["JWT_JWT_ACCESS_TIME_EXP"]) || 3600; // 1hs
    this.refreshTimeExp = Number(process.env["JWT_JWT_REFRESH_TIME_EXP"]) || 86400; // 24hs
    if (!this.secretKey) throw new Error("Secret key no definido o inválido.");
    this.payload = {};
  }

  public setSubject = (subject: string = "") => {
    if (!subject) throw new JWTException("JWT: Subject no definido o inválido.", 500);
    this.payload = Object.assign(this.payload, { sub: subject });
    return this;
  };

  private calculateExpirationTime = (typeJWT: "ACCESS" | "REFRESH" | "FORGOT") => {
    const NOW_IN_SECONDS = Math.floor(Date.now() / 1000);
    const expirationTime = {
      FORGOT: NOW_IN_SECONDS + this.forgotTimeExp,
      ACCESS: NOW_IN_SECONDS + this.accessTimeExp,
      REFRESH: NOW_IN_SECONDS + this.refreshTimeExp,
    };
    return expirationTime[typeJWT];
  };

  public setExpiration = (typeJWT: "ACCESS" | "REFRESH" | "FORGOT") => {
    this.payload = Object.assign(this.payload, {
      exp: this.calculateExpirationTime(typeJWT),
    });
    return this;
  };

  private setNotBefore = () => {
    this.payload = Object.assign(this.payload, { nbf: Math.floor(Date.now() / 1000) });
    return this;
  };

  private setIssuedAt = () => {
    this.payload = Object.assign(this.payload, { iat: Math.floor(Date.now() / 1000) });
    return this;
  };

  public setPayload = (payload: object) => {
    this.payload = Object.assign(this.payload, payload);
    return this;
  };

  public build = () => {
    this.setNotBefore().setIssuedAt();
    return jwt.sign(this.payload, this.secretKey);
  };

  public static decode = (token: string) => {
    if (!token) throw new JWTException("JWT: token no definido o inválido.", 500);
    const SECRET_KEY = process.env["JWT_SECRET_KEY"] || "";
    if (!SECRET_KEY) throw new JWTException("JWT: secret key no definido o inválido.", 500);
    try {
      const decodedToken = jwt.verify(token, SECRET_KEY);
      if (!decodedToken || typeof decodedToken !== "object")
        throw new UnauthorizedException("Token inválido.");
      return decodedToken;
    } catch (_error) {
      throw new UnauthorizedException("Token inválido.");
    }
  };
}
