import { IContainer } from './IContainer';
import MapReduce from '../Funcs/MapReduce';
import { DefinitionContainer } from './DefinitionContainer';

export class Container extends DefinitionContainer implements IContainer {
  constructor() {
    super();
    this.setDefinition(Container.name, Container);
    this.setResolvedDefinition(Container.name, this);
  }

  get<T>(name: string, something?: any): T {
    if (! this.hasDefinition(name)) {
      if (! something) {
        throw new Error(`There is no definition registered with ${name}.`);
      }

      return something;
    }

    if (! this.hasResolvedDefinition(name)) {
      return this.resolveDefinition(name);
    }

    return this.getResolvedDefinition(name);
  }

  getDefinitions(): any {
    return MapReduce(this.definitions);
  }

  getResolvedDefinitions(): any {
    return MapReduce(this.resolvedDefinitions);
  }

  register<T = any>(definition: any): IContainer {
    return this.registerWithName(definition.name, definition);
  }

  registerWithName<T = any>(name: string, definition: any): IContainer {
    if (this.hasDefinition(name)) {
      throw new Error(`Definition ${name} was registered.`);
    }

    this.setDefinition(name, definition);
    return this;
  }

  inject(name: string, injectableName: string, index: number = 0): void {
    const dependencies = this.fetchDependencies(name);
    for (const dependency of dependencies) {
      if (dependency === injectableName) {
        throw new Error(`Duplicate inject ${dependency} into ${name}`);
      }
    }

    dependencies[index] = injectableName;
    this.definitionDependencies.set(name, dependencies);
  }

  public set<T>(name: string, definition: any): void {
    this.setDefinition(name, definition);
    this.setResolvedDefinition(name, definition);
  }

  private resolveDefinition<T>(name: string): any {
    if (this.hasResolvedDefinition(name)) {
      return this.getResolvedDefinition(name);
    }

    const definition = this.getDefinition(name);
    const dependencies = this.fetchDependencies(name)
      .map((dependency: any) => this.resolveDefinition(dependency));

    if (dependencies.length > 0) {
      return this.setResolvedDefinition(name, new definition(...dependencies));
    }

    return this.setResolvedDefinition(name, new definition());
  }
}
