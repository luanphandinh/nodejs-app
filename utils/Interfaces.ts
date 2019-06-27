import { Request, Response } from 'express';

export interface IAsyncHandler {
  async(fn: Function): Function;
}

export interface IHttpError {
  code: number;
  message: string;
  errors: any;
}

export interface IErrorHandler {
  handle(err: IHttpError, req: Request, res: Response, next: Function): Response;
}
