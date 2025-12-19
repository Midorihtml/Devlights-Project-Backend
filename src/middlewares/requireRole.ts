import type { Request, Response, NextFunction } from "express";
import type { IUser } from "../interfaces/IUser.js";

/**
 * Middleware para permitir solo usuarios con rol ADMIN.
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = req.user as IUser;
  if (user?.role != "ADMIN") {
    res.status(403).json({ message: "Acceso denegado: solo administradores" });
    return;
  }
  next();
}

/**
 * Middleware para permitir solo usuarios con rol CUSTOMER.
 */
export function requireCustomer(req: Request, res: Response, next: NextFunction) {
  const user = req.user as IUser;
  if (user?.role !== "CUSTOMER") {
    res.status(403).json({ message: "Acceso denegado: solo clientes" });
    return;
  }
  next();
}

/**
 * Middleware para permitir cualquier usuario autenticado.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    res.status(401).json({ message: "Acceso denegado: usuario no autenticado" });
    return;
  }
  next();
}
