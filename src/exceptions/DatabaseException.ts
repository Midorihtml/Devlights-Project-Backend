import { StatusCode } from "../enums/StatusCode.js";
import { Exception } from "../lib/Exception.js";

export class DatabaseException extends Exception {
  constructor(
    message: string = "Database error.",
    code: number = StatusCode.InternalServerError,
    context = {},
  ) {
    super(message, code, context);
  }
}
