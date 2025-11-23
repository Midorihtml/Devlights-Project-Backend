import { StatusCode } from "@src/enums/StatusCode";
import { Exception } from "@src/lib/Exception";

export class BadRequestException extends Exception {
  constructor(message = "Bad request", code = StatusCode.BadRequest, context = {}) {
    super(message, code, context);
  }
}
