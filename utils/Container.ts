export interface IContainer {
  get<T>(name: string): T;
  register<T>(definition: T): IContainer;
  registerWithName<T>(name: string, definition: T): IContainer;
}

export class Container implements IContainer {
  private entries: any = {};

  get<T>(name: string): T {
    if (! this.entries[name]) {
      throw new Error(`Can not resolved entries for ${name}.`);
    }

    return this.entries[name];
  }

  register<T = any>(definition: any): IContainer {
    return this.registerWithName(definition.name, definition);
  }

  registerWithName<T = any>(name: string, definition: any): IContainer {
    this.entries[name] = this.resolveDefinition(name, definition);

    return this;
  }

  private resolveDefinition<T>(name: string, definition: any): T {
    if (this.entries[name] !== undefined) {
      throw new Error(`Entry ${name} has been registered.`);
    }

    let entry = definition;
    if (definition instanceof Function) {
      entry = new definition();
    }

    return entry;
  }
}
