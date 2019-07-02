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

  describe('getDefinitions', () => {
    it('should not affect definitions from container', () => {
      const container: Container = new Container();
      container.register(HelloWorld);

      const entries = container.getDefinitions();
      expect(entries).toHaveProperty(HelloWorld.name);
      entries[HelloWorld.name] = 'changed';

      expect(container.get<HelloWorld>(HelloWorld.name)).not.toBe('changed');
    });

    it('should be able to get all definitions', () => {
      const container: Container = new Container();
      container.register(HelloWorld);
      container.registerWithName('For HelloWorld', HelloWorld);

      const entries = container.getDefinitions();
      expect(entries).toHaveProperty(HelloWorld.name);
      expect(entries).toHaveProperty('For HelloWorld');
    });
  });

  describe('inject', () => {
    it('should throw error if duplicate inject', () => {
      class ForInject {}
      class DuplicateInjectError {}

      const container: Container = new Container();
      container.register(ForInject);
      container.register(DuplicateInjectError);

      expect(() => {
        container.inject(DuplicateInjectError.name, ForInject.name);
        container.inject(DuplicateInjectError.name, ForInject.name);
      }).toThrowError(`Duplicate inject ${ForInject.name} into ${DuplicateInjectError.name}`);
    });

    it('should resolve definition with dependencies', () => {
      class Dependency {
        info = () => 'This is dependency';
      }

      class HaveDependency {
        constructor(public dependency: Dependency) {};
      }

      const container: Container = new Container();
      container.register(Dependency);
      container.register(HaveDependency);

      container.inject(HaveDependency.name, Dependency.name);
      expect(container.get<HaveDependency>(HaveDependency.name).dependency.info()).toEqual('This is dependency');
    });
  });

  describe('get', () => {
    it('should able to resolve itself', () => {
      const container: Container = new Container();
      container.register(HelloWorld);

      const resolvedContainer = container.get<Container>(Container.name);
      expect(container.get<HelloWorld>(HelloWorld.name).say()).toEqual('Hello World!');
    });

    it('should throw error if attempt to get no registered definition', () => {
      const container: Container = new Container();
      expect(() => container.get('No registered')).toThrowError('There is no definition registered with No registered.');
    });

    it('should able to get entry', () => {
      const container: Container = new Container();
      container.register(HelloWorld);

      expect(container.get<HelloWorld>(HelloWorld.name).say()).toEqual('Hello World!');
    });

    it('should resolve entries with name', () => {
      const container: Container = new Container();
      container.registerWithName('For HelloWorld', HelloWorld);

      expect(container.get<HelloWorld>('For HelloWorld').say()).toEqual('Hello World!');
    });

    it('should throw error if cannot resolve entries', () => {
      const container: Container = new Container();
      expect(() => container.get<any>('something wrong')).toThrowError('There is no definition registered with something wrong.');
    });
  });
});
