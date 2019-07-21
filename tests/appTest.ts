import * as request from 'supertest';

import config from '@src/config';
import { IConfig, IApp } from '@utils/Interfaces';
import { App } from '@utils/App';
import { Server } from 'http';

export class AppTest {
  private app: IApp = null;
  private config: IConfig = config;
  private listener: any;
  private server: Server;

  private getApp(): IApp {
    if (! this.app) {
      this.app = new App()
        .useConfig(this.config.setPort(9091))
        .build();
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
      this.server = app.run();
      this.listener = request(app.getApp());
    }

    return this.listener;
  }

  public stop(done: any) {
    this.server.close(done);
    this.server = null;
  }
}

export default new AppTest();
