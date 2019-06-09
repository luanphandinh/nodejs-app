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

export class Err404 extends StatusError {
  constructor(message: string, errs: any = []) {
    super(message, errs);
    this.name = 'Err404';
  }
}
