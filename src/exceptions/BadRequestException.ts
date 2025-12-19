import { StatusCode } from "../enums/StatusCode";
import { Exception } from "../lib/Exception";

export class BadRequestException extends Exception {
  constructor(message = "Bad request", code = StatusCode.BadRequest, context = {}) {
    super(message, code, context);
  }
}
