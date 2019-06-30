export interface IContainer {
  get<T>(name: string): T;
  getAll(): any;
  inject(name: string, injectableName: string, index: number): void;
  resolve<T>(name: string): T;
  register<T>(definition: T): IContainer;
  registerWithName<T>(name: string, definition: T): IContainer;
}
