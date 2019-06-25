# nodejs-template [![Build Status](https://travis-ci.org/luanphandinh/nodejs-app.svg?branch=master)](https://travis-ci.org/luanphandinh/nodejs-app) [![Coverage Status](https://coveralls.io/repos/github/luanphandinh/nodejs-app/badge.svg?branch=master)](https://coveralls.io/github/luanphandinh/nodejs-app?branch=master)
```
Simple express js app
This project is under development process and not yet productable.
```

### Development
```
npm run dev
```

### Test
```
npm run test
```

## utils/ErrorHandler
Handle errors and return corresponding `HTTP_STATUS_CODE` with `throw new HttpError` anywhere in your app.  
<br>
Define custom http errors.
```typescript
export interface IHttpError {
  code: number;
  message: string;
  errors: any;
}

export class HttpError extends Error implements IHttpError {
  readonly code: number;
  readonly errors: any;

  constructor(code: number, message: string, errs: any = []) {
    super(message);
    this.code = code;
    this.errors = errs;
  }
}

```

Simply handle these errors by 
```typescript
export interface IErrorHandler {
  handle(err: IHttpError, req: Request, res: Response, next: Function): Response;
}
```

And use this `handler`
```typescript
app.use((new ErrorHandler).handle);
```
### utils/Async
Handling async route, pass error down to next `error handler`
```typescript
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
```
