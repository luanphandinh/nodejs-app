import * as http from 'http';
import * as request from 'supertest';

import app from '@src/app';

export class App {
  private listener: any;
  private server: http.Server;

  public listen() {
    if (!this.server) {
      this.server = app.listen(9091);
      this.listener = request(app);
    }

    return this.listener;
  }

  public stop() {
    this.server.close();
    this.server = null;
  }
}

export default new App();
