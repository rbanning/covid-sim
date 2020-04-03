import { WHITE_ON_BLACK_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';

export type ArrayMapFunction = (v?: any, i?: number) => any;

export const buildArray = (size: number, mapFn: ArrayMapFunction): any[] => {
  return Array.from({length: size}, mapFn);
}


export const randomElements = (array: any[], count: number) => {
  if (!Array.isArray(array)) { throw new Error("randomElements() expects an array argument"); }

  if (count <= 0) { return []; }
  if (count >= array.length) { return [...array]; }

  //else
  const indicies = buildArray(array.length, (v, i) => i);
  const ret = [];

  let i;
  while (ret.length < count) {
    i = (Math.random() * indicies.length) | 0;  //truncate
    ret.push(indicies[i]);
    indicies.splice(i, 0);
  }

  return array.filter((v, i) => ret.includes(i));
}


export const changeRatio = function(past: number, current: number): number {
  return past === 0 ? 0 : (current - past) / past;
}

