import type { Request, Response, NextFunction } from "express";
import type { IUser } from "../interfaces/IUser";

/**
 * Middleware para permitir solo usuarios con rol ADMIN.
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = req.user as IUser;
  if (user?.role != "ADMIN") {
    return res.status(403).json({ message: "Acceso denegado: solo administradores" });
  }
  next();
}

/**
 * Middleware para permitir solo usuarios con rol CUSTOMER.
 */
export function requireCustomer(req: Request, res: Response, next: NextFunction) {
  const user = req.user as IUser;
  if (user?.role !== "CUSTOMER") {
    return res.status(403).json({ message: "Acceso denegado: solo clientes" });
  }
  next();
}

/**
 * Middleware para permitir cualquier usuario autenticado.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ message: "Acceso denegado: usuario no autenticado" });
  }
  next();
}
