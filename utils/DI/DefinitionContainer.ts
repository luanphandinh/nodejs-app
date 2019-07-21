export class DefinitionContainer {
  protected definitions: Map<string, any>;
  protected definitionDependencies: Map<string, any[]>;
  protected resolvedDefinitions: Map<string, any>;

  constructor() {
    this.definitions = new Map<string, any>();
    this.definitionDependencies = new Map<string, any[]>();
    this.resolvedDefinitions = new Map<string, any>();
  }

  protected hasDefinition(name: string): boolean {
    return this.definitions.has(name);
  }

  protected setDefinition(name: string, definition: any): void {
    this.definitions.set(name, definition);

    return this.getDefinition(name);
  }

  protected getDefinition(name: string): any {
    return this.definitions.get(name);
  }

  protected setResolvedDefinition(name: string, definition: any): any {
    this.resolvedDefinitions.set(name, definition);

    return this.getResolvedDefinition(name);
  }

  protected hasResolvedDefinition(name: string): boolean {
    return this.resolvedDefinitions.has(name);
  }

  protected getResolvedDefinition(name: string): any {
    return this.resolvedDefinitions.get(name);
  }

  protected fetchDependencies(name: string) {
    return this.definitionDependencies.has(name)
      ? this.definitionDependencies.get(name)
      : [];
  }
}
