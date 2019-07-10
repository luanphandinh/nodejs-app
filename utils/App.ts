import * as express from 'express';
import { IApp, IConfig } from './Interfaces';

export class App implements IApp {
  private app: express.Express;
  private config: IConfig;

  private built: boolean;

  useConfig(config: IConfig): IApp {
    this.config = config;
    return this;
  }

  public build(): IApp {
    this.app = express();
    this.app.set('port', this.config.getPort());
    this.config.getBodyParser() && this.app.use(this.config.getBodyParser());
    this.config.getUrlEncoder() && this.app.use(this.config.getUrlEncoder());
    this.config.getRouter() && this.app.use(this.config.getRouter());
    this.config.getErrorHandler() && this.app.use(this.config.getErrorHandler().handle);

    this.built = true;
    return this;
  }

  public getApp(): express.Express {
    if (! this.built) {
      throw new Error('please call App.build() before getApp()');
    }

    return this.app;
  }
}
