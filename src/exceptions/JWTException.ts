import { StatusCode } from "../enums/StatusCode";
import type { IError } from "../interfaces/IError";
import { Exception } from "../lib/Exception";

export class JWTException extends Exception implements IError {
  constructor(
    message: string = "JWT error.",
    code: number = StatusCode.InternalServerError,
    context = {},
  ) {
    super(message, code, context);
  }
}
