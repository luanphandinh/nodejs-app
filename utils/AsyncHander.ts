export interface IAsyncHandler {
  async(fn: Function): Function;
}

export class AsyncHandler implements IAsyncHandler{
  public async(fn: Function): Function {
    return function (...args: any[]) {
      const func = fn(...args);
      const next = args[args.length - 1];
      return Promise.resolve(func).catch(next);
    };
  }
}
