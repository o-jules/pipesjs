import { PipeMeta, DataType } from "../types";

/**
 * Return a new object omitting specific props of the input object
 * 
 * @param obj Object to omit some keys
 * @param keys Keys to omit
 */
export function omitProps<T extends object, K extends (keyof T)>(obj: T, ...keys: K[]): Omit<T, K> {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key as K))) as any;
}

export const omitPropsMeta: PipeMeta = {
  id: 'object/omit-props',
  name: 'Omit Props',
  params: [
    {
      key: 'props',
      name: "Property to omit",
      type: DataType.array,
      subtype: DataType.string,
    }
  ]
};
