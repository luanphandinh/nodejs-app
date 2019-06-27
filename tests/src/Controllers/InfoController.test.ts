import { Response } from 'supertest';
import appTest from '@tests/appTest';

describe('GET /', () => {
  afterEach(done => appTest.stop(done));

  it('should return 200 OK', () => {
    return appTest
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
