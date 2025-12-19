import { StatusCode } from "../enums/StatusCode.js";
import { Exception } from "../lib/Exception.js";

export class UnauthorizedException extends Exception {
  constructor(
    message: string = "No autorizado.",
    code: number = StatusCode.Unauthorized,
    context = {},
  ) {
    super(message, code, context);
  }
}
