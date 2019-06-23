import { Container } from '@utils/Container';

describe('Container', () => {
  class HelloWorld {
    public say = () => 'Hello World!';
  }

  it('should resolve entries', () => {
    const container: Container = new Container();
    container.register(HelloWorld);

    expect(container.get<HelloWorld>(HelloWorld.name).say()).toEqual('Hello World!');
  });

  it('should throw error if attempt to duplicate register entries', () => {
    const container: Container = new Container();
    container.register(HelloWorld);

    expect(() => container.register(HelloWorld)).toThrowError(Error);
  });

  it('should resolve entries with name', () => {
    const container: Container = new Container();
    container.registerWithName('For HelloWorld', HelloWorld);

    expect(container.get<HelloWorld>('For HelloWorld').say()).toEqual('Hello World!');
  });

  it('should throw error if cannot resolve entries', () => {
    const container: Container = new Container();
    expect(() => container.get<any>('something')).toThrowError(Error);
  });
});
