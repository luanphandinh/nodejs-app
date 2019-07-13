export default (map: Map<any, any>) => {
  const reducer: any = {};
  for (const [k, v] of map.entries()) {
    reducer[k] = v;
  }

  return reducer;
};
