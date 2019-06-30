import { IContainer } from './IContainer';

export class Container implements IContainer {
  private definitions: Map<string, any> = new Map<string, any>();
  private resolvedDefinitions: Map<string, any> = new Map<string, any>();

  get<T>(name: string): T {
    if (! this.definitions.has(name)) {
      throw new Error(`There is no definition registered with ${name}.`);
    }

    return this.definitions.get(name);
  }

  getAll(): any {
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
    if (this.definitions.has(name)) {
      throw new Error(`Definition ${name} was registered.`);
    }

    this.definitions.set(name, definition);
    return this;
  }

  resolve<T>(name: string): T {
    if (! this.definitions.has(name)) {
      throw new Error(`There is no entry registered with ${name}.`);
    }

    if (! this.resolvedDefinitions.has(name)) {
      this.resolvedDefinitions.set(name, this.resolveDefinition(name));
    }

    return this.resolvedDefinitions.get(name);
  }

  private resolveDefinition<T>(name: string): T {
    const definition = this.definitions.get(name);
    let entry = definition;
    if (definition instanceof Function) {
      entry = new definition();
    }

    return entry;
  }
}
