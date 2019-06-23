import { Container } from '@utils/Container';
import { ErrorHandler } from '@utils/ErrorHandler';
import { AsyncHandler } from '@utils/AsyncHander';

export default new Container()
  .register(ErrorHandler.name, new ErrorHandler())
  .register(AsyncHandler.name, new AsyncHandler())
;
