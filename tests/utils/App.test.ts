import { Config } from '@utils/Config';
import { App } from '@utils/App';

describe('App', () => {

  it('should be able to build app with config and start running', () => {
    const app = new App()
      .useConfig(new Config())
      .build()
      .getApp();

    expect(app).not.toBe(undefined);
  });

  it('should prevent getApp if not built', () => {
    expect(() => new App().useConfig(new Config()).getApp())
      .toThrowError('please call App.build() before getApp()');
  });
});
