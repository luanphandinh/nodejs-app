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
    const isPropertyInject = parameterIndex === undefined;
    const isParameterInject = typeof parameterIndex === 'number';

    if (isPropertyInject) {
      const type = Reflect.getMetadata(DESIGN_TYPE, target, propertyKey);
      target[propertyKey] = container.resolve(type.name);
    }

    if (isParameterInject) {
      const types = Reflect.getMetadata(DESIGN_PARAM_TYPES, target, propertyKey);
      container.inject(target.name, types[parameterIndex].name, parameterIndex);
    }
  };
}

function getContainer(): IContainer {
  return container;
}

export { injectable, inject, getContainer };
