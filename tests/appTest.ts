import * as express from 'express';
import * as http from 'http';
import * as request from 'supertest';

import { App } from '@src/app';
import Handlers from "@utils/Handlers";

export class AppTest {
  private app: express.Express = null;
  private listener: any;
  private server: http.Server;

  public getApp(): AppTest {
    if (!this.app) {
      this.app = App.getApp();
    }

    return this;
  }

  public withRoute(name: string, callback: any): AppTest {
    this.app.use((express.Router()).get(name, callback));

    return this;
  }

  public listen() {
    // Handling errors always at the end of app.use
    this.app.use(Handlers.error);
    if (!this.server) {
      this.server = this.app.listen(9091);
      this.listener = request(this.app);
    }

    return this.listener;
  }

  public stop() {
    this.server.close();
    this.server = null;
  }
}

export default new AppTest().getApp();