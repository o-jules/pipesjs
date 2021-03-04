import { pickProps } from '../pick-props';

it("pick-props", () => {
  const raw = { a: [], b: 1, c: true, d: 'pick-props' };

  {
    const o = pickProps(raw, 'a', 'd');
    expect(o).toHaveProperty("a");
    expect(o).not.toHaveProperty("b");
    expect(o).not.toHaveProperty("c");
    expect(o).toHaveProperty("d");

    expect(o.a).toBe(raw.a);
    expect(o.d).toBe(raw.d);
  }

  {
    const o = pickProps(raw, 'b', 'c');
    expect(o).not.toHaveProperty("a");
    expect(o).toHaveProperty("b");
    expect(o).toHaveProperty("c");
    expect(o).not.toHaveProperty("d");

    expect(o.b).toBe(raw.b);
    expect(o.c).toBe(raw.c);
  }

});