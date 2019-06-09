import { Request, Response } from 'express';
import { StatusError, Err400, Err404 } from './Errors';

export default class Handlers {
  static async(fn: Function) {
    return function (...args: any[]) {
      const func = fn(...args);
      const next = args[args.length - 1];
      return Promise.resolve(func).catch(next);
    };
  }

  static error(err: StatusError, req: Request, res: Response, next: Function) {
    const message = {
      message: err.message,
      errors: err.errors,
    };

    switch (err.name) {
      case Err400.name:
        return res.status(400).json(message);

      case Err404.name:
        return res.status(404).json(message);

      default:
        return res.status(500).json(message);
    }
  }
}
