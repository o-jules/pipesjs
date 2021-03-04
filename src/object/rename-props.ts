import { PipeMeta, DataType } from "../types";

/**
 * Detect if property name can cause prototype pollution
 * 
 * @param name property name
 */
function isDangerous(name: string): boolean {
  return (
    name === 'constructor' ||
    name === 'function' ||
    name === '__proto__'
  );
}

type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

type MapPair<O extends object, P> =
  P extends [infer A, infer B] ? B extends string ? A extends keyof O ?
  { [key in B]: O[A] } :
  {} : {} : never;

type MapPairs<O extends object, T extends [keyof O, string][]> =
  UnionToIntersection<MapPair<O, T[number]>>;

/**
 * Rename props of object
 * @param obj 
 * @param namePair 
 */
export function renamePropsByPair<O extends object, P extends string, M extends [(keyof O), P]>
  (obj: O, ...namePair: M[]): Omit<O, M[0]> & MapPairs<O, typeof namePair> {

  return Object.fromEntries(Object.entries(obj)
    .filter(pair => !isDangerous(pair[0]))
    .map((pair) => {
      const matched = namePair.find(m => m[0] === pair[0]);
      return matched ? [matched[1], pair[1]] : pair;
    })) as any;
}

/**
 * Rename props of object
 * @param obj 
 * @param nameMap 
 */
export function renamePropsByMap<O extends object, NP extends { [key: string]: keyof O }>
  (obj: O, nameMap: NP): Omit<O, NP[keyof NP]> & { [K in keyof NP]: O[NP[K]] } {

  const map = Object.fromEntries(Object.entries(nameMap).map(i => [i[1], i[0]]));
  return Object.fromEntries(Object.entries(obj)
    .filter(pair => !isDangerous(pair[0]))
    .map((pair) => pair[0] in map ? [map[pair[0] as any], pair[1]] : pair)) as any;
}


export const meta: PipeMeta = {
  id: 'object/rename-props',
  name: 'Rename Props',
  params: [
    {
      key: 'props',
      name: "Property to rename",
      type: DataType.array,
      subtype: {
        type: DataType.pair,
        subtype: DataType.string
      },
    }
  ]
};

