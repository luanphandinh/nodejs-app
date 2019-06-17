import { Response as TestResponse } from 'supertest';
import { Request, Response } from "express";

import app from '@tests/appTest';
import { AsyncHandler } from '@utils/AsyncHander';
import { HttpError } from '@utils/HttpError';

describe('error', () => {
  it('should return 400 Bad Request', () => {
    return app
      .withRoute('/400', (req: Request, res: Response): Response => {
        throw new HttpError(400, 'Invalid Params');
      })
      .listen()
      .get('/400')
      .expect(400)
      .then((res: TestResponse) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Invalid Params');
        expect(res.body).toHaveProperty('errors');
      });
  });

  it('should return 404 Not Found', () => {
    return app
      .withRoute('/404', (req: Request, res: Response): Response => {
        throw new HttpError(404, 'Bad Request');
      })
      .listen()
      .get('/404')
      .expect(404)
      .then((res: TestResponse) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Bad Request');
        expect(res.body).toHaveProperty('errors');
      });
  });

  it('should return 500 Internal Error', () => {
    return app
      .withRoute('/500', (req: Request, res: Response): Response => {
        throw new Error("Internal Error");
      })
      .listen()
      .get('/500')
      .expect(500)
      .then((res: TestResponse) => {
        expect(res.body).toHaveProperty('message');
      });
  });
});

describe('async', () => {
  it('should handle async response', () => {
    return app
      .withRoute('/async', (new AsyncHandler).async(async (req: Request, res: Response): Promise<Response> => res.json({ async: 'work'})))
      .listen()
      .get('/async')
      .expect(200)
      .then((res: TestResponse) => {
        expect(res.body).toEqual({ async: 'work'});
      });
  });

  it('should handle async error correctly', () => {
    return app
      .withRoute('/async400', (new AsyncHandler).async(async (req: Request, res: Response): Promise<Response> => {
        throw new HttpError(400, 'Invalid Params');
      }))
      .listen()
      .get('/async400')
      .expect(400)
      .then((res: TestResponse) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Invalid Params');
        expect(res.body).toHaveProperty('errors');
      });
  });
});

afterEach(() => app.stop());
