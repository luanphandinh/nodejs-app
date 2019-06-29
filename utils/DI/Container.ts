import { IContainer } from './IContainer';

export class Container implements IContainer {
  private definitions: any = {};
  private resolvedDefinitions: any = {};

  get<T>(name: string): T {
    if (! this.definitions[name]) {
      throw new Error(`There is no definition registered with ${name}.`);
    }

    return this.definitions[name];
  }

  getAll(): any {
    return {
      ...this.definitions,
    };
  }

  register<T = any>(definition: any): IContainer {
    return this.registerWithName(definition.name, definition);
  }

  registerWithName<T = any>(name: string, definition: any): IContainer {
    if (this.definitions[name] !== undefined) {
      throw new Error(`Definition ${name} was registered.`);
    }

    this.definitions[name] = definition;
    return this;
  }

  resolve<T>(name: string): T {
    if (! this.definitions[name]) {
      throw new Error(`There is no entry registered with ${name}.`);
    }

    if (! this.resolvedDefinitions[name]) {
      this.resolvedDefinitions[name] = this.resolveDefinition(this.definitions[name]);
    }

    return this.resolvedDefinitions[name];
  }

  private resolveDefinition<T>(definition: any): T {
    let entry = definition;
    if (definition instanceof Function) {
      entry = new definition();
    }

    return entry;
  }
}
