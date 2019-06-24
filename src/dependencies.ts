import { Container } from '@utils/DI/Container';
import { ErrorHandler } from '@utils/ErrorHandler';
import { AsyncHandler } from '@utils/AsyncHander';

export default new Container()
  .register(ErrorHandler)
  .register(AsyncHandler)
;
