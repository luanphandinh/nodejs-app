import { Request, Response, Express } from 'express';
import { IErrorHandler } from './Interfaces';

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

export interface IConfig {
  usePort(port: number | string): IConfig;
  useRouter(router: any): IConfig;
  useBodyParser(bodyParser: any): IConfig;
  useUrlEncoder(urlEncoder: any): IConfig;
  useErrorHandler(handler: IErrorHandler): IConfig;

  getPort(): number | string;
  getRouter(): any | null;
  getBodyParser(): any | null;
  getUrlEncoder(): any | null;
  getErrorHandler(): any | null;
}

export interface IApp {
  useConfig(config: IConfig): IApp;
  build(): IApp;
  getApp(): Express;
}
