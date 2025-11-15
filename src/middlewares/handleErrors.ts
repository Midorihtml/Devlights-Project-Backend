import type { IError } from "@src/interfaces/IError";
import type { Request, Response, NextFunction } from "express";

export const handleErrors = (err: IError, _: Request, res: Response, next: NextFunction) => {
  res.status(err.code || 500).send({
    code: err.code || 500,
    msg: err.message || "Servicio no disponible.",
    data: null,
  });

  const now = new Date()
    .toLocaleString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(",", "");

  console.log("-".repeat(10));
  console.group("Error:");
  console.log("date: ", now);
  console.error("message: ", err.message || "Servicio no disponible.");
  console.log("context: ", err.context || "");
  console.groupEnd();
  console.log("-".repeat(10));

  next();
};
