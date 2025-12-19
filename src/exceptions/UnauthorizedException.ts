import { StatusCode } from "../enums/StatusCode";
import { Exception } from "../lib/Exception";

export class UnauthorizedException extends Exception {
  constructor(
    message: string = "No autorizado.",
    code: number = StatusCode.Unauthorized,
    context = {},
  ) {
    super(message, code, context);
  }
}
