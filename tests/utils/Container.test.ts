import { Container } from '@utils/DI/Container';

describe('Container', () => {
  class HelloWorld {
    public say = () => 'Hello World!';
  }

  it('should resolve entries', () => {
    const container: Container = new Container();
    container.register(HelloWorld);

    expect(container.get<HelloWorld>(HelloWorld.name).say()).toEqual('Hello World!');
  });

  it('should resolve all entries', () => {
    const container: Container = new Container();
    container.register(HelloWorld);
    container.registerWithName('For HelloWorld', HelloWorld);

    const entries = container.getAll();
    expect(entries).toHaveProperty(HelloWorld.name);
    expect(entries).toHaveProperty('For HelloWorld');
  });

  it('should not affect entries from container', () => {
    const container: Container = new Container();
    container.register(HelloWorld);

    const entries = container.getAll();
    expect(entries).toHaveProperty(HelloWorld.name);
    entries[HelloWorld.name] = 'changed';

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
