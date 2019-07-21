import { IConfig, IErrorHandler } from './Interfaces';

export class Config implements IConfig {
  static DEFAULT_PORT: number = 3306;

  private name: string = 'app';
  private port: number | string = Config.DEFAULT_PORT;
  private router: any = null;
  private bodyParser: any = null;
  private urlEncoder: any = null;
  private errorHandler: IErrorHandler = null;

  public setName(name: string): IConfig {
    this.name = name;
    return this;
  }

  public setPort(port: number | string): IConfig {
    this.port = port;
    return this;
  }

  public useBodyParser(bodyParser: any): IConfig {
    this.bodyParser = bodyParser;
    return this;
  }

  public useUrlEncoder(urlEncoder: any): IConfig {
    this.urlEncoder = urlEncoder;
    return this;
  }

  public useErrorHandler(handler: IErrorHandler): IConfig {
    this.errorHandler = handler;
    return this;
  }

  public useRouter(router: any): IConfig {
    this.router = router;
    return this;
  }

  getBodyParser(): any {
    return this.bodyParser;
  }

  getErrorHandler(): any {
    return this.errorHandler;
  }

  getName(): string {
    return this.name;
  }

  getPort(): number | string {
    return this.port;
  }

  getRouter(): any[] {
    return this.router;
  }

  getUrlEncoder(): any {
    return this.urlEncoder;
  }
}
