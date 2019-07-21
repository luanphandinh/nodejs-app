export interface IContainer {
  /**
   * Get resolved dependencies out of container.
   * @param name
   * @param something will return if can not get name.
   */
  get<T>(name: string, something?: any): T;

  /**
   * Get all definitions from container.
   */
  getDefinitions(): any;

  /**
   * Get all resolved definition from container.
   */
  getResolvedDefinitions(): any;

  /**
   * Override or Set the definition over name inside container.
   * Depends on the definition being set are value or function -> Container.get will return correspond execution context.
   * WILL NOT BE RESOLVED BY CONTAINER.
   * @param name
   * @param definition
   */
  set<T>(name: string, definition: any): void;

  /**
   * Inject the dependencies into definition(name)
   * @param name
   * @param injectableName
   * @param index
   */
  inject(name: string, injectableName: string, index: number): void;

  /**
   * Register the definition with definition.name
   * WILL BE RESOLVED BY CONTAINER.
   * @param definition
   */
  register<T>(definition: T): IContainer;

  /**
   * Register the definition with name
   * WILL BE RESOLVED BY CONTAINER.
   * @param name
   * @param definition
   */
  registerWithName<T>(name: string, definition: T): IContainer;
}
