import { IAsyncHandler } from './Interfaces';
import { injectable } from './DI/DI';

@injectable()
export class AsyncHandler implements IAsyncHandler{
  public async(fn: Function): Function {
    return function (...args: any[]) {
      const func = fn(...args);
      const next = args[args.length - 1];
      return Promise.resolve(func).catch(next);
    };
  }
}
