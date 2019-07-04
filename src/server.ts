import * as dotenv from 'dotenv';
import { Server } from 'http';

import config from '@src/config';
import { App } from '@utils/App';

dotenv.config();
const app = new App()
  .useConfig(config)
  .build()
  .getApp();

const server: Server = app.listen(app.get('port'), () => {
  console.log(('appTest is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
  console.log('Press CTRL-C to stop\n');
});
