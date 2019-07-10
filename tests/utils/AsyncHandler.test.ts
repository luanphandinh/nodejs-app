import appTest from '@tests/appTest';

import { Request, Response } from 'express';
import { Response as TestResponse } from 'supertest';
import { AsyncHandler } from '@utils/AsyncHandler';
import { HttpError } from '@utils/HttpError';
import { DI } from '@utils/DI/DI';

describe('async', () => {
  afterEach(done => appTest.stop(done));

  it('should handle async response', () => {
    return appTest
      .withRoute('/async', (DI.getContainer().get<AsyncHandler>(AsyncHandler.name))
        .async(async (req: Request, res: Response): Promise<Response> => res.json({ async: 'work' })))
      .listen()
      .get('/async')
      .expect(200)
      .then((res: TestResponse) => {
        expect(res.body).toEqual({ async: 'work' });
      });
  });

  it('should handle async error correctly', () => {
    return appTest
      .withRoute('/async400', (DI.getContainer().get<AsyncHandler>(AsyncHandler.name))
        .async(async (req: Request, res: Response): Promise<Response> => {
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
