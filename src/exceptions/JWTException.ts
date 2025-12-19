import { StatusCode } from "../enums/StatusCode.js";
import type { IError } from "../interfaces/IError.js";
import { Exception } from "../lib/Exception.js";

export class JWTException extends Exception implements IError {
  constructor(
    message: string = "JWT error.",
    code: number = StatusCode.InternalServerError,
    context = {},
  ) {
    super(message, code, context);
  }
}
