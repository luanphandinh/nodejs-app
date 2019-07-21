import MapReduce from '@utils/Funcs/MapReduce';

describe('MapReduce', () => {

  it('should be able to reduce a map into [key, value] pairs', () => {
    const map1: Map<string, any> = new Map<string, any>();
    const map2: Map<number, any> = new Map<number, any>();

    map1.set('map1-k1', 'v1');
    map1.set('map1-k2', 'v2');
    expect(MapReduce(map1)).toEqual({
      'map1-k1': 'v1',
      'map1-k2': 'v2',
    });

    map2.set(1, 'v1');
    map2.set(2, 'v2');
    expect(MapReduce(map2)).toEqual({
      1: 'v1',
      2: 'v2',
    });
  });

});
