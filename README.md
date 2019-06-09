# nodejs-template [![Build Status](https://travis-ci.org/luanphandinh/nodejs-template.svg?branch=master)](https://travis-ci.org/luanphandinh/nodejs-template)
simple express js app

### Development
`npm run dev`

### Test
`npm run test`

## utils/Errors
Handle errors and return corresponding `HTTP_STATUS_CODE` with `throw new Err...` anywhere in your app.  
<br>
Define custom http errors.
```typescript
export class StatusError extends Error {
  public errors: any;

  constructor(message: string, errs: any) {
    super(message);
    this.errors = errs;
  }
}

export class Err400 extends StatusError {
  constructor(message: string, errs: any = []) {
    super(message, errs);
    this.name = 'Err400';
  }
}
```

Simply handle these errors by 
```typescript
static error(err: StatusError, req: Request, res: Response, next: Function) {
  const message = {
    message: err.message,
    errors: err.errors,
  };

  switch (err.name) {
    case Err400.name:
      return res.status(400).json(message);

    default:
      return res.status(500).json(message);
  }
}
```

And use this `handler`
```typescript
app.use(Handlers.error);
```
### utils/Async
Handling async route, pass error down to next `error handler`
```typescript
static async(fn: Function) {
    return function (...args: any[]) {
      const func = fn(...args);
      const next = args[args.length - 1];
      return Promise.resolve(func).catch(next);
    };
  }
```
