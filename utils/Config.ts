import { IConfig, IErrorHandler } from './Interfaces';

export class Config implements IConfig {
  static DEFAULT_PORT: number = 3306;

  private port: number | string;
  private router: any;
  private bodyParser: any;
  private urlEncoder: any;
  private errorHandler: IErrorHandler;

  public usePort(port: number | string): IConfig {
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

  getPort(): number | string {
    return this.port || Config.DEFAULT_PORT;
  }

  getRouter(): any[] {
    return this.router || [];
  }

  getUrlEncoder(): any {
    return this.urlEncoder;
  }
}
