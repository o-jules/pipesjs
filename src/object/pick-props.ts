import { PipeMeta, DataType } from "../types";

/**
 * Return a new object selecting specific props of the input object
 * 
 * @param obj Object to select some keys
 * @param keys Keys to select
 */
export function pickProps<T extends object, K extends (keyof T)>(obj: T, ...keys: K[]): Pick<T, K> {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key as K))) as any;
}

export const pickPropsMeta: PipeMeta = {
  id: 'object/pick-props',
  name: 'Select Props',
  params: [
    {
      key: 'props',
      name: "Property to select",
      type: DataType.array,
      subtype: DataType.string,
    }
  ]
};
