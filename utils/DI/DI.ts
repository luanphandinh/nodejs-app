import { Container } from './Container';
import { IContainer } from './IContainer';

const container: IContainer = new Container();

export const injectable = (): ClassDecorator => {
  return (target: any) => {
    container.register(target);
  };
};

export const getContainer = (): IContainer => {
  return container;
};
