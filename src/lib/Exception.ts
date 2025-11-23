import type { IError } from "@src/interfaces/IError";

export class Exception implements IError {
  code: number;
  message: string;
  context: object;

  constructor(message: string = "Error.", code: number = 500, context = {}) {
    this.message = message;
    this.code = code;
    this.context = context;
  }
}
