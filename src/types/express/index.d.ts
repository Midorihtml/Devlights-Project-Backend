import type { IUser } from "@src/interfaces/IUser";

declare module "express-serve-static-core" {
  interface Request {
    user?: Partial<IUser> | null;
    token?: string | null;
  }
}
