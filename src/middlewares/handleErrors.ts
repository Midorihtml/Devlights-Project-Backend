import type { IError } from "@src/interfaces/IError";
import type { Request, Response, NextFunction } from "express";

export const handleErrors = (err: IError, _: Request, res: Response, next: NextFunction) => {
  let statusCode = err.code || 500;
  let message = err.message || "Servicio no disponible.";

  // Handle MongoDB duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    message = "El registro ya existe (dato duplicado).";
  } else if (statusCode < 100 || statusCode > 599) {
    // Ensure status code is valid HTTP status
    statusCode = 500;
  }

  res.status(statusCode).send({
    code: statusCode,
    msg: message,
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
