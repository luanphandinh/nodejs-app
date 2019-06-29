import { Container } from '@utils/DI/Container';

describe('Container', () => {
  class HelloWorld {
    public say = () => 'Hello World!';
  }

  describe('register', () => {
    it('should throw error if attempt to duplicate register entries', () => {
      const container: Container = new Container();
      container.register(HelloWorld);

      expect(() => container.register(HelloWorld)).toThrowError(Error);
    });
  });

  describe('get', () => {
    it('should throw error if attempt to get no registered definition', () => {
      const container: Container = new Container();
      expect(() => container.get('No registered')).toThrowError('There is no definition registered with No registered.');
    });

    it('should not affect definitions from container', () => {
      const container: Container = new Container();
      container.register(HelloWorld);

      const entries = container.getAll();
      expect(entries).toHaveProperty(HelloWorld.name);
      entries[HelloWorld.name] = 'changed';

      expect(container.get<HelloWorld>(HelloWorld.name)).not.toBe('changed');
    });

    it('should be able to get all definitions', () => {
      const container: Container = new Container();
      container.register(HelloWorld);
      container.registerWithName('For HelloWorld', HelloWorld);

      const entries = container.getAll();
      expect(entries).toHaveProperty(HelloWorld.name);
      expect(entries).toHaveProperty('For HelloWorld');
    });
  });

  describe('resolve', () => {
    it('should resolve entries', () => {
      const container: Container = new Container();
      container.register(HelloWorld);

      expect(container.resolve<HelloWorld>(HelloWorld.name).say()).toEqual('Hello World!');
    });

    it('should resolve entries with name', () => {
      const container: Container = new Container();
      container.registerWithName('For HelloWorld', HelloWorld);

      expect(container.resolve<HelloWorld>('For HelloWorld').say()).toEqual('Hello World!');
    });

    it('should throw error if cannot resolve entries', () => {
      const container: Container = new Container();
      expect(() => container.resolve<any>('something')).toThrowError('There is no entry registered with something.');
    });
  });
});
