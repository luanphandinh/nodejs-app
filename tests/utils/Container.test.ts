import { Container } from '@utils/Container';

describe('Container', () => {
  it('resolve entries', () => {
    const container: Container = new Container();
    container.register<any>('success', () => 'registered');

    expect(container.get<any>('success')()).toEqual('registered');
    expect(() => container.get<any>('failed')).toThrowError(Error);
  });
});
