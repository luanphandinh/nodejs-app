export interface IContainer {
  get<T>(name: string): T;
  getAll(): any;
  register<T>(definition: T): IContainer;
  registerWithName<T>(name: string, definition: T): IContainer;
}
