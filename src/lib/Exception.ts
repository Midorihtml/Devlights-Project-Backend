import type { IError } from "../interfaces/IError.js";

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
