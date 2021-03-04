import { omitProps } from '../omit-props';

it("omit-props", () => {
  const raw = { a: [], b: 1, c: true, d: 'omit-props' };

  {
    const o = omitProps(raw, 'a', 'd');
    expect(o).not.toHaveProperty("a");
    expect(o).toHaveProperty("b");
    expect(o).toHaveProperty("c");
    expect(o).not.toHaveProperty("d");

    expect(o.b).toBe(raw.b);
    expect(o.c).toBe(raw.c);
  }

  {
    const o = omitProps(raw, 'b', 'c');
    expect(o).toHaveProperty("a");
    expect(o).not.toHaveProperty("b");
    expect(o).not.toHaveProperty("c");
    expect(o).toHaveProperty("d");

    expect(o.a).toBe(raw.a);
    expect(o.d).toBe(raw.d);
  }

});