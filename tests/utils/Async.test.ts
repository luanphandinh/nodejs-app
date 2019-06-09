import { Response as TestResponse } from 'supertest';
import { Request, Response } from "express";

import app from '@tests/appTest';
import { Err400 } from "@utils/Errors";
import Handlers from '@utils/Handlers';

describe('utils/Handlers.async', () => {
  it('should handle async response', () => {
    return app
      .withRoute('/async', Handlers.async(async (req: Request, res: Response): Promise<Response> => res.json({ async: 'work'})))
      .listen()
      .get('/async')
      .expect(200)
      .then((res: TestResponse) => {
        expect(res.body).toEqual({ async: 'work'});
      });
  });

  it('should handle async error correctly', () => {
    return app
      .withRoute('/400', Handlers.async(async (req: Request, res: Response): Promise<Response> => {
        throw new Err400('Invalid Params');
      }))
      .listen()
      .get('/400')
      .expect(400)
      .then((res: TestResponse) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Invalid Params');
        expect(res.body).toHaveProperty('errors');
      });
  });
});

afterEach(() => app.stop());
