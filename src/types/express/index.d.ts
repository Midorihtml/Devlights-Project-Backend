import type { IUser } from "../../interfaces/IUser.js";

declare module "express-serve-static-core" {
  interface Request {
    user?: Partial<IUser> | null;
    token?: string | null;
  }
}
