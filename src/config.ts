import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

import routes from '@src/routes';
import { ErrorHandler } from '@utils/ErrorHandler';
import { DI } from '@utils/DI/DI';
import { Config } from '@utils/Config';
import { IErrorHandler } from '@utils/Interfaces';

dotenv.config();

export default new Config()
  .useBodyParser(bodyParser.json())
  .useUrlEncoder(bodyParser.urlencoded({ extended: true }))
  .useRouter(routes)
  .useErrorHandler(DI.getContainer().get<IErrorHandler>(ErrorHandler.name));
