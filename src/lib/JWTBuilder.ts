import jwt from "jsonwebtoken";
import { JWTException } from "@src/exceptions/JWTException";
import { UnauthorizedException } from "@src/exceptions";

export class JWTBuilder {
  private secretKey: string;
  private accessTimeExp: number;
  private refreshTimeExp: number;
  private payload: object;

  constructor() {
    this.secretKey = process.env["JWT_SECRET_KEY"] || "";
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

  public setExpiration = (typeJWT: "ACCESS" | "REFRESH") => {
    const TIME_EXPIRATION = typeJWT === "ACCESS" ? this.accessTimeExp : this.refreshTimeExp; // 1HS : 24HS
    this.payload = Object.assign(this.payload, {
      exp: Math.floor(Date.now() / 1000) + TIME_EXPIRATION,
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
