import LinkedList from "./linked-list.js";

describe("list test", () => {
  let list;
  beforeEach(() => {
    list = new LinkedList();
  });

  it("class defined", () => {
    expect(LinkedList).toBeDefined();
  });

  it("append function", () => {
    expect(list).toHaveProperty("append");
    expect(typeof list.append).toBe("function");
  });

  it("prepend function", () => {
    expect(list).toHaveProperty("prepend");
    expect(typeof list.prepend).toBe("function");
  });

  it("size function", () => {
    expect(list).toHaveProperty("size");
    expect(typeof list.size).toBe("function");

    list.append("value1");
    list.prepend("value2");
    expect(list.size()).toBe(2);
  });

  it("head function", () => {
    expect(list).toHaveProperty("head");
    expect(typeof list.head).toBe("function");
    expect(list.head()).toBeUndefined();

    list.prepend("value1");
    expect(list.head()).toBe("value1");
    list.prepend("value2");
    expect(list.head()).toBe("value2");
  });

  it("tail function", () => {
    expect(list).toHaveProperty("tail");
    expect(typeof list.tail).toBe("function");
    expect(list.tail()).toBeUndefined();

    list.append("value1");
    expect(list.tail()).toBe("value1");
    list.append("value2");
    expect(list.tail()).toBe("value2");
  });

  it("at function", () => {
    expect(list).toHaveProperty("at");
    expect(typeof list.at).toBe("function");

    list.append("value1");
    list.append("value2");
    list.prepend("value0");
    expect(list.at(0)).toBe("value0");
    expect(list.at(1)).toBe("value1");
    expect(list.at(2)).toBe("value2");
    expect(list.at(3)).toBeUndefined();
    expect(list.at(-1)).toBeUndefined();

    const list2 = new LinkedList();
    // empty list edge case
    expect(list2.at(1)).toBeUndefined();
  });

  it("pop function", () => {
    expect(list).toHaveProperty("pop");
    expect(typeof list.pop).toBe("function");

    for (let i = 0; i < 3; i++) {
      list.append(`value${i}`);
    }
    const top = list.pop();
    expect(top).toBe("value0");
    list.pop();
    list.pop();
    expect(list.pop()).toBeUndefined();
    expect(list.size()).toBe(0);
  });

  it("contains function", () => {
    expect(list).toHaveProperty("contains");
    expect(typeof list.contains).toBe("function");

    for (let i = 0; i < 3; i++) {
      list.append(`value${i}`);
    }
    expect(list.contains("value0")).toBe(true);
    expect(list.contains("value1")).toBe(true);
    expect(list.contains("value2")).toBe(true);
    expect(list.contains("value3")).toBe(false);
  });

  it("findIndex function", () => {
    expect(list).toHaveProperty("findIndex");
    expect(typeof list.findIndex).toBe("function");

    for (let i = 0; i < 3; i++) {
      list.append(`value${i}`);
    }
    expect(list.findIndex("value0")).toBe(0);
    expect(list.findIndex("value1")).toBe(1);
    expect(list.findIndex("value2")).toBe(2);
    expect(list.findIndex("value3")).toBe(-1);
  });

  it("toString function", () => {
    expect(list).toHaveProperty("toString");
    expect(typeof list.toString).toBe("function");
    expect(list.toString()).toBe("");

    list.append("value0");
    expect(list.toString()).toBe(`( value0 ) -> null`);
    list.append("value1");
    expect(list.toString()).toBe(`( value0 ) -> ( value1 ) -> null`);
  });

  it("insertAt function", () => {
    expect(list).toHaveProperty("insertAt");
    expect(typeof list.insertAt).toBe("function");

    const list2 = new LinkedList();
    const list3 = new LinkedList();
    const list4 = new LinkedList();
    for (let i = 0; i < 3; i++) {
      list.append(`value${i}`);
      list2.append(`value${i}`);
      list3.append(`value${i}`);
      list4.append(`value${i}`);
    }

    list.insertAt(0, "insert1", "insert2");
    expect(list.toString()).toBe(
      `( insert1 ) -> ( insert2 ) -> ( value0 ) -> ( value1 ) -> ( value2 ) -> null`,
    );

    list2.insertAt(1, "insert1", "insert2");
    expect(list2.toString()).toBe(
      `( value0 ) -> ( insert1 ) -> ( insert2 ) -> ( value1 ) -> ( value2 ) -> null`,
    );

    list3.insertAt(3, "insert1", "insert2");
    expect(list3.toString()).toBe(
      `( value0 ) -> ( value1 ) -> ( value2 ) -> ( insert1 ) -> ( insert2 ) -> null`,
    );

    expect(() => list4.insertAt(-1, "insert1", "insert2")).toThrow(RangeError);
    expect(() => list4.insertAt(4, "insert1", "insert2")).toThrow(RangeError);
  });

  it("removeAt function", () => {
    expect(list).toHaveProperty("removeAt");
    expect(typeof list.removeAt).toBe("function");

    const list2 = new LinkedList();
    const list3 = new LinkedList();
    const list4 = new LinkedList();
    for (let i = 0; i < 3; i++) {
      list.append(`value${i}`);
      list2.append(`value${i}`);
      list3.append(`value${i}`);
      list4.append(`value${i}`);
    }

    list.removeAt(0);
    expect(list.toString()).toBe(`( value1 ) -> ( value2 ) -> null`);

    list2.removeAt(1);
    expect(list2.toString()).toBe(`( value0 ) -> ( value2 ) -> null`);

    list3.removeAt(2);
    expect(list3.toString()).toBe(`( value0 ) -> ( value1 ) -> null`);
    expect(list3.tail()).toBe("value1");

    expect(() => list4.removeAt(-1)).toThrow(RangeError);
    expect(() => list4.removeAt(3)).toThrow(RangeError);
  });
});
