import { IContainer } from './IContainer';

export class Container implements IContainer {
  private definitions: Map<string, any> = new Map<string, any>();
  private definitionDependencies: Map<string, any[]> = new Map<string, any[]>();
  private resolvedDefinitions: Map<string, any> = new Map<string, any>();

  get<T>(name: string): T {
    if (! this.hasDefinition(name)) {
      throw new Error(`There is no definition registered with ${name}.`);
    }

    if (! this.hasResolvedDefinition(name)) {
      this.set(name, this.resolveDefinition(name));
    }

    return this.resolvedDefinitions.get(name);
  }

  getDefinitions(): any {
    const definitions: any = {};
    for (const [k, v] of this.definitions.entries()) {
      definitions[k] = v;
    }

    return definitions;
  }

  register<T = any>(definition: any): IContainer {
    return this.registerWithName(definition.name, definition);
  }

  registerWithName<T = any>(name: string, definition: any): IContainer {
    if (this.hasDefinition(name)) {
      throw new Error(`Definition ${name} was registered.`);
    }

    this.definitions.set(name, definition);
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

  private hasDefinition(name: string): boolean {
    return this.definitions.has(name);
  }

  private hasResolvedDefinition(name: string): boolean {
    return this.resolvedDefinitions.has(name);
  }

  private fetchDependencies(name: string) {
    return this.definitionDependencies.has(name)
      ? this.definitionDependencies.get(name)
      : [];
  }

  public set<T>(name: string, definition: any): void {
    this.resolvedDefinitions.set(name, definition);
  }

  private resolveDefinition<T>(name: string): void {
    if (this.hasResolvedDefinition(name)) {
      return this.get(name);
    }

    const definition = this.definitions.get(name);
    const dependencies = this.fetchDependencies(name)
      .map((dependency: any) => this.resolveDefinition(dependency));

    if (dependencies.length > 0) {
      return new definition(...dependencies);
    }

    return new definition();
  }
}
