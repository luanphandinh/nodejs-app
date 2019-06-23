import { Response } from 'supertest';
import app from '@tests/appTest';

describe('GET /', () => {
  afterEach((done) => app.stop(done));

  it('should return 200 OK', () => {
    return app
      .listen()
      .get('/')
      .expect(200)
      .then((res: Response) => {
        expect(res.body).toHaveProperty('service');
        expect(res.body).toHaveProperty('version');
        expect(res.body).toHaveProperty('time');
      });
  });
});
