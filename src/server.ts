import * as dotenv from 'dotenv';

import config from '@src/config';
import { App } from '@utils/App';

dotenv.config();
new App()
  .useConfig(config)
  .build()
  .run();
