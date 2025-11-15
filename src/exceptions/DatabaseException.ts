import type { IError } from "@src/interfaces/IError";

export class DatabaseException implements IError {
  code: number;
  message: string;
  context: object;

  constructor(message: string = "Database error.", code: number = 500, context = {}) {
    this.message = message;
    this.code = code;
    this.context = context;
  }
}
