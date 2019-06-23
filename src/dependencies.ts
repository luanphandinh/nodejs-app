import { Container } from '@utils/Container';
import { ErrorHandler } from '@utils/ErrorHandler';
import { AsyncHandler } from '@utils/AsyncHander';

export default new Container()
  .registerWithName('ErrorHandler', ErrorHandler)
  .registerWithName('AsyncHandler', AsyncHandler)
;
