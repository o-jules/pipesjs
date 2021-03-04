import { renamePropsByPair, renamePropsByMap } from '../rename-props';

interface RawData {
  a: string[];
  b: number;
  c: boolean;
  d: string;
}

it('rename-props-by-pair', () => {
  const raw: RawData = { a: [], b: 1, c: true, d: 'pick-props' };

  {
    const o = renamePropsByPair(raw, ['a', 'A'], ["b", "B"]);

    expect(o).not.toHaveProperty("a");
    expect(o).toHaveProperty("A");
    expect(o).not.toHaveProperty("b");
    expect(o).toHaveProperty("B");
    expect(o).toHaveProperty("c");
    expect(o).toHaveProperty("d");

    expect(o.A).toBe(raw.a);
    expect(o.B).toBe(raw.b);
    expect(o.c).toBe(raw.c);
    expect(o.d).toBe(raw.d);
  }
});

it('rename-props-by-map', () => {
  const raw: RawData = { a: [], b: 1, c: true, d: 'pick-props' };

  {
    const o = renamePropsByMap(raw, { 'A': 'a', 'B': 'b' });

    expect(o).not.toHaveProperty("a");
    expect(o).toHaveProperty("A");
    expect(o).not.toHaveProperty("b");
    expect(o).toHaveProperty("B");
    expect(o).toHaveProperty("c");
    expect(o).toHaveProperty("d");

    expect(o.A).toBe(raw.a);
    expect(o.B).toBe(raw.b);
    expect(o.c).toBe(raw.c);
    expect(o.d).toBe(raw.d);
  }
});