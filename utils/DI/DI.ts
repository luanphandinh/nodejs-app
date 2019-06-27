import 'reflect-metadata';
import { Container } from './Container';
import { IContainer } from './IContainer';

const DESIGN_TYPE = 'design:type';
const container: IContainer = new Container();

function injectable(): ClassDecorator {
  return (target: any) => {
    container.register(target);
  };
}

function inject() {
  return (target: any, propertyKey: string | symbol) => {
    const type = Reflect.getMetadata(DESIGN_TYPE, target, propertyKey);
    target[propertyKey] = container.get(type.name);
  };
}

function getContainer(): IContainer {
  return container;
}

export { injectable, inject, getContainer };
