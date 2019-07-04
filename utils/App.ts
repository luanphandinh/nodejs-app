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
    this.app
      .set('port', this.config.getPort())
      .use(this.config.getBodyParser())
      .use(this.config.getUrlEncoder())
      .use(this.config.getRouter())
      .use(this.config.getErrorHandler().handle);

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
