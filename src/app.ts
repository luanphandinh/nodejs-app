import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

import routes from '@lupa/routes';

dotenv.config();

const app: express.Express = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

export default app;
