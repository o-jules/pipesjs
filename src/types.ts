
export interface PipeMeta {
  id: string;
  name: string;
  desc?: string;
  params: PipeParams[];
}

export enum DataType {
  int,
  float,
  boolean,
  string,
  array,
  pair,
  map,
  set,
}

type SubType =
  {
    type: DataType.int | DataType.float | DataType.string | DataType.boolean
  } |
  {
    type: DataType.array | DataType.pair | DataType.map | DataType.set
    subtype: DataType | SubType;
  }

export type PipeParams = {
  key: string;
  name: string;
  desc?: string;
} & SubType;