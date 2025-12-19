import { StatusCode } from "../enums/StatusCode";
import { Exception } from "../lib/Exception";

export class DatabaseException extends Exception {
  constructor(
    message: string = "Database error.",
    code: number = StatusCode.InternalServerError,
    context = {},
  ) {
    super(message, code, context);
  }
}
