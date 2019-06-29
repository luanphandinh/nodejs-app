import 'reflect-metadata';
import { Container } from './Container';
import { IContainer } from './IContainer';

const DESIGN_TYPE = 'design:type';
const DESIGN_PARAM_TYPES = 'design:paramtypes';
const container: IContainer = new Container();

function injectable(): ClassDecorator {
  return (target: any) => {
    container.register(target);
  };
}

function inject() {
  return (target: any, propertyKey: string | symbol, parameterIndex?: number) => {
    if (parameterIndex === undefined) {
      const type = Reflect.getMetadata(DESIGN_TYPE, target, propertyKey);
      target[propertyKey] = container.get(type.name);
    } else {
      const types = Reflect.getMetadata(DESIGN_PARAM_TYPES, target, propertyKey);
      const values = types.map((type: any) => container.get(type.name)); // Resolves later
    }
  };
}

function getContainer(): IContainer {
  return container;
}

export { injectable, inject, getContainer };
