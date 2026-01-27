// linked-list.test.js
import assert from "node:assert/strict";
import test from "node:test";
import LinkedList from "./linked-list.js";

/* ===== 공통 헬퍼 ===== */
function expectEqual(actual, expected, label) {
  assert.equal(
    actual,
    expected,
    `[${label}] expected=${expected}, actual=${actual}`,
  );
}

/* ===== 테스트 ===== */
test("empty list basics", () => {
  const list = new LinkedList();

  expectEqual(list.size(), 0, "size(empty)");
  expectEqual(list.head(), undefined, "head(empty)");
  expectEqual(list.tail(), undefined, "tail(empty)");
  expectEqual(list.at(0), undefined, "at(0) empty");
  expectEqual(list.pop(), undefined, "pop(empty)");
  expectEqual(list.contains(123), false, "contains(empty)");
  expectEqual(list.findIndex(123), -1, "findIndex(empty)");
  expectEqual(list.toString(), "", "toString(empty)");
});

test("append adds to end", () => {
  const list = new LinkedList();
  list.append(1);
  list.append(2);
  list.append(3);

  expectEqual(list.size(), 3, "size after append");
  expectEqual(list.head(), 1, "head after append");
  expectEqual(list.tail(), 3, "tail after append");
  expectEqual(list.at(0), 1, "at(0)");
  expectEqual(list.at(1), 2, "at(1)");
  expectEqual(list.at(2), 3, "at(2)");
  expectEqual(list.at(3), undefined, "at(out of bound)");
  expectEqual(
    list.toString(),
    "( 1 ) -> ( 2 ) -> ( 3 ) -> null",
    "toString after append",
  );
});

test("prepend adds to start", () => {
  const list = new LinkedList();
  list.prepend(2);
  list.prepend(1);
  list.prepend(0);

  expectEqual(list.size(), 3, "size after prepend");
  expectEqual(list.head(), 0, "head after prepend");
  expectEqual(list.tail(), 2, "tail after prepend");
  expectEqual(
    list.toString(),
    "( 0 ) -> ( 1 ) -> ( 2 ) -> null",
    "toString after prepend",
  );
});

test("pop removes head and returns its value", () => {
  const list = new LinkedList();
  list.append(1);
  list.append(2);
  list.append(3);

  expectEqual(list.pop(), 1, "pop returns head");
  expectEqual(list.size(), 2, "size after pop");
  expectEqual(list.head(), 2, "head after pop");
  expectEqual(list.tail(), 3, "tail after pop");

  expectEqual(list.pop(), 2, "pop second");
  expectEqual(list.pop(), 3, "pop third");
  expectEqual(list.size(), 0, "size after pops");
  expectEqual(list.head(), undefined, "head empty after pops");
  expectEqual(list.tail(), undefined, "tail empty after pops");
  expectEqual(list.pop(), undefined, "pop empty");
});

test("contains / findIndex", () => {
  const list = new LinkedList();
  list.append("a");
  list.append("b");
  list.append("b");
  list.append("c");

  expectEqual(list.contains("b"), true, "contains b");
  expectEqual(list.contains("x"), false, "contains x");

  expectEqual(list.findIndex("a"), 0, "findIndex a");
  expectEqual(list.findIndex("b"), 1, "findIndex b (first)");
  expectEqual(list.findIndex("c"), 3, "findIndex c");
  expectEqual(list.findIndex("x"), -1, "findIndex x");
});

test("insertAt inserts values at index", () => {
  const list = new LinkedList();
  list.append(1);
  list.append(2);
  list.append(3);

  list.insertAt(1, 10, 11);
  expectEqual(
    list.toString(),
    "( 1 ) -> ( 10 ) -> ( 11 ) -> ( 2 ) -> ( 3 ) -> null",
    "insertAt middle",
  );

  list.insertAt(0, -2, -1);
  expectEqual(
    list.toString(),
    "( -2 ) -> ( -1 ) -> ( 1 ) -> ( 10 ) -> ( 11 ) -> ( 2 ) -> ( 3 ) -> null",
    "insertAt start",
  );

  list.insertAt(list.size(), 99);
  expectEqual(list.tail(), 99, "insertAt end");

  assert.throws(
    () => list.insertAt(-1, 0),
    (err) => (
      console.error("[insertAt -1]", err.message),
      err instanceof RangeError
    ),
  );
  assert.throws(
    () => list.insertAt(list.size() + 1, 0),
    (err) => (
      console.error("[insertAt oob]", err.message),
      err instanceof RangeError
    ),
  );
});

test("removeAt removes node at index", () => {
  const list = new LinkedList();
  list.append(1);
  list.append(2);
  list.append(3);
  list.append(4);

  list.removeAt(1);
  expectEqual(
    list.toString(),
    "( 1 ) -> ( 3 ) -> ( 4 ) -> null",
    "removeAt middle",
  );
  expectEqual(list.size(), 3, "size after removeAt middle");
  expectEqual(list.head(), 1, "head after removeAt middle");
  expectEqual(list.tail(), 4, "tail after removeAt middle");

  list.removeAt(0);
  expectEqual(list.toString(), "( 3 ) -> ( 4 ) -> null", "removeAt head");
  expectEqual(list.head(), 3, "head after removeAt head");

  list.removeAt(list.size() - 1);
  expectEqual(list.toString(), "( 3 ) -> null", "removeAt tail");
  expectEqual(list.tail(), 3, "tail after removeAt tail");

  assert.throws(
    () => list.removeAt(-1),
    (err) => (
      console.error("[removeAt -1]", err.message),
      err instanceof RangeError
    ),
  );
  assert.throws(
    () => list.removeAt(list.size()),
    (err) => (
      console.error("[removeAt oob]", err.message),
      err instanceof RangeError
    ),
  );
});
