export interface IContainer {
  get<T>(name: string): T;
  getDefinitions(): any;
  inject(name: string, injectableName: string, index: number): void;
  register<T>(definition: T): IContainer;
  registerWithName<T>(name: string, definition: T): IContainer;
}
