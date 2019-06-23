import { Request, Response } from 'express';

export interface IContainer {
  get<T>(name: string): T;
  register<T>(definition: T): IContainer;
  registerWithName<T>(name: string, definition: T): IContainer;
}

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

