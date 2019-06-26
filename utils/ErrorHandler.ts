import { Request, Response } from 'express';
import { IErrorHandler, IHttpError } from './Interfaces';
import { injectable } from './DI/DI';

@injectable()
export class ErrorHandler implements IErrorHandler {
  public handle(err: IHttpError, req: Request, res: Response, next: Function) {
    const message = {
      message: err.message,
      errors: err.errors,
    };

    const statusCode = err.code > 0 ? err.code : 500;

    return res.status(statusCode).json(message);
  }
}
