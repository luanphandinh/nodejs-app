import * as DI from '@utils/DI/DI';
// tslint:disable-next-line:no-duplicate-imports
import { injectable } from '@utils/DI/DI';

describe('DI', () => {
  @injectable()
  class HelloWorld {
    public say = () => 'Hello World!';
  }

  it('should injectable class and resolve it', () => {
    const container = DI.getContainer();
    expect(container.get<HelloWorld>(HelloWorld.name).say()).toEqual('Hello World!');
  });
});
