import { StatusCode } from "@src/enums/StatusCode";
import type { IError } from "@src/interfaces/IError";
import { Exception } from "@src/lib/Exception";

export class JWTException extends Exception implements IError {
  constructor(
    message: string = "JWT error.",
    code: number = StatusCode.InternalServerError,
    context = {},
  ) {
    super(message, code, context);
  }
}
