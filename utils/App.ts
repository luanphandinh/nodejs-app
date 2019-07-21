import * as express from 'express';
import { IApp, IConfig } from './Interfaces';
import { Server } from 'http';

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
    this.app.set('name', this.config.getName());
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

  public run(): Server {
    return this.app.listen(this.app.get('port'), () => {
      console.log((`${this.app.get('name')} is running at http://localhost:${this.app.get('port')} in ${this.app.get('env')} mode`));
      console.log('Press CTRL-C to stop\n');
    });
  }
}
