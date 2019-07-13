export interface IContainer {
  get<T>(name: string): T;
  set<T>(name: string, definition: any): void;
  getDefinitions(): any;
  getResolvedDefinitions(): any;
  inject(name: string, injectableName: string, index: number): void;
  register<T>(definition: T): IContainer;
  registerWithName<T>(name: string, definition: T): IContainer;
}
