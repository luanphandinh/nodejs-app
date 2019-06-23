export interface IContainer {
  register<T>(name: string, definition: T): IContainer;
  get<T>(name: string): T;
}

export class Container implements IContainer {
  private entries: any = {};

  get<T>(name: string): T {
    if (! this.entries[name]) {
      throw new Error(`Can not resolved entries for ${name}`);
    }

    return this.entries[name];
  }

  register<T>(name: string, definition: T): IContainer {
    this.entries[name] = definition;
    return this;
  }
}
