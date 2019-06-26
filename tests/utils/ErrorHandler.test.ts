import app from '@tests/appTest';
import { Request, Response } from "express";
import { Response as TestResponse } from "supertest";
import { HttpError } from '@utils/HttpError';

describe('error', () => {
  afterEach((done) => app.stop(done));

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
