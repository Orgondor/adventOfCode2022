export const sum = (...values: number[]): number => {
  let sum = 0;
  values.forEach((value) => (sum += value));
  return sum;
};

export const maxEntries = (count: number, ...input: number[]): number[] => {
  const maxValues = input.slice(0, count);
  let curMin = Math.min(...maxValues);
  input.slice(count).forEach((value) => {
    if (value > curMin) {
      const id = maxValues.findIndex((mValue) => mValue === curMin);
      if (id >= 0) {
        maxValues[id] = value;
      }
      curMin = Math.min(...maxValues);
    }
  });
  return maxValues;
};
