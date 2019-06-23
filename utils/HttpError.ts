import { IHttpError } from './Interfaces';

export class HttpError extends Error implements IHttpError {
  readonly code: number;
  readonly errors: any;

  constructor(code: number, message: string, errs: any = []) {
    super(message);
    this.code = code;
    this.errors = errs;
  }
}
