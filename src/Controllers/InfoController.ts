import { Request, Response } from 'express';

export class InfoController {
  public index(req: Request, res: Response): Response {
    return res.json({
      service: 'nodejs-template',
      version: 'v1.0',
      time: Date.now(),
    });
  }
}

export default new InfoController();
