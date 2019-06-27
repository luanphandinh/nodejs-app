import { Container } from './Container';
import { IContainer } from './IContainer';

const container: IContainer = new Container();

function injectable(): ClassDecorator {
  return (target: any) => {
    container.register(target);
  };
}

function getContainer(): IContainer {
  return container;
}

export { injectable, getContainer };
