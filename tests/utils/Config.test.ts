import { Config } from '@utils/Config';
import { ErrorHandler } from '@utils/ErrorHandler';

describe('Config', () => {
  it('should be able to build app config correctly', () => {
    const config = new Config()
      .setName('appTest')
      .setPort(3000)
      .useUrlEncoder({ name: 'encoder' })
      .useBodyParser({ name: 'body' })
      .useErrorHandler(new ErrorHandler)
      .useRouter(['route1']);

    expect(config.getRouter()).toEqual(['route1']);
    expect(config.getName()).toEqual('appTest');
    expect(config.getPort()).toEqual(3000);
    expect(config.getUrlEncoder()).toEqual({ name: 'encoder' });
    expect(config.getBodyParser()).toEqual({ name: 'body' });
    expect(config.getErrorHandler()).not.toBe(undefined);
  });
});
