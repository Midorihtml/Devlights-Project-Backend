import jwt from "jsonwebtoken";
import { JWTException } from "@src/exceptions/JWTException";

export class JWTBuilder {
  private secretKey: string;
  private payload: object;

  constructor() {
    this.secretKey = process.env["JWT_SECRET_KEY"] || "";
    if (!this.secretKey) throw new Error("Secret key no definido o inválido.");
    this.payload = {};
  }

  public setSubject = (subject: string = "") => {
    if (!subject) throw new JWTException("JWT: Subject no definido o inválido.", 500);
    this.payload = Object.assign(this.payload, { sub: subject });
    return this;
  };

  public setExpiration = (typeJWT: "ACCESS" | "REFRESH") => {
    const TIME_EXPIRATION = typeJWT === "ACCESS" ? 3600 : 86400; // 1HS : 24HS
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
    return jwt.verify(token, SECRET_KEY);
  };
}
