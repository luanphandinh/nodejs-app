export interface IContainer {
  get<T>(name: string): T;
  getAll(): any;
  resolve<T>(name: string): T;
  register<T>(definition: T): IContainer;
  registerWithName<T>(name: string, definition: T): IContainer;
}
