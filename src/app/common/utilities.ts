export type ArrayMapFunction = (v?: any, i?: number) => any;

export const buildArray = (size: number, mapFn: ArrayMapFunction): any[] => {
  return Array.from({length: size}, mapFn);
}
