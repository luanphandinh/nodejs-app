import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

import routes from '@src/routes';
import dependencies from '@src/dependencies';
import { ErrorHandler } from '@utils/ErrorHandler';

dotenv.config();

export class App {
  public static getApp(): express.Express {
    const app: express.Express = express();
    app.set('port', process.env.PORT || 3000);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(routes);
    app.use(dependencies.get<ErrorHandler>('ErrorHandler').handle);

    return app;
  }
}

export default App.getApp();
