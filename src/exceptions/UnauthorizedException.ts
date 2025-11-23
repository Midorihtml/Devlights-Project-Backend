import { StatusCode } from "@src/enums/StatusCode";
import { Exception } from "@src/lib/Exception";

export class UnauthorizedException extends Exception {
  constructor(
    message: string = "No autorizado.",
    code: number = StatusCode.Unauthorized,
    context = {},
  ) {
    super(message, code, context);
  }
}
