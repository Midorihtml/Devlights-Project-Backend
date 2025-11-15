import type { IError } from "@src/interfaces/IError";

export class BadRequestException implements IError {
  message: string;
  code: number;
  context: object;

  constructor(message = "Bad request", code = 400, context = {}) {
    this.message = message;
    this.code = code;
    this.context = context;
  }
}
