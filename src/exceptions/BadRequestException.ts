import { StatusCode } from "../enums/StatusCode.js";
import { Exception } from "../lib/Exception.js";

export class BadRequestException extends Exception {
  constructor(message = "Bad request", code = StatusCode.BadRequest, context = {}) {
    super(message, code, context);
  }
}
