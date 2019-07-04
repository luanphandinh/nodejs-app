import { Express } from 'express';
import { Server } from 'http';
import * as request from 'supertest';

import config from '@src/config';
import { IConfig } from '@utils/Interfaces';
import { App } from '@utils/App';

export class AppTest {
  private app: Express = null;
  private config: IConfig = config;
  private listener: any;
  private server: Server;

  private getApp(): Express {
    if (! this.app) {
      this.app = new App()
        .useConfig(this.config)
        .build()
        .getApp();
    }

    return this.app;
  }

  public withRoute(name: string, callback: any): AppTest {
    this.config.getRouter().get(name, callback);
    return this;
  }

  public listen() {
    const app = this.getApp();
    if (! this.server) {
      this.server = app.listen(9091);
      this.listener = request(app);
    }

    return this.listener;
  }

  public stop(done: any) {
    this.server.close(done);
    this.server = null;
  }
}

export default new AppTest();
