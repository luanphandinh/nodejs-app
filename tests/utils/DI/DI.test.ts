import * as DI from '@utils/DI/DI';
// tslint:disable-next-line:no-duplicate-imports
import { injectable, inject } from '@utils/DI/DI';

describe('DI', () => {
  @injectable()
  class HelloWorld {
    public say = () => 'Hello World!';
  }

  class Hero {
    @inject()
    public will: HelloWorld;
  }

  it('should injectable class and resolve it', () => {
    const hero = new Hero();
    expect(hero.will.say()).toEqual('Hello World!');
  });
});
