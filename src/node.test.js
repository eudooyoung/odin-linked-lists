import Node from "./node.js";

describe("Node test", () => {
  it("class defined", () => {
    expect(Node).toBeDefined();
  });

  it("object properties", () => {
    const node = new Node();
    expect(node).toHaveProperty("value");
    expect(node).toHaveProperty("nextNode");
  });

  it("initial state", () => {
    const node = new Node();
    expect(node.value).toBeNull();
    expect(node.nextNode).toBeNull();
  });

  it("constructor behavior", () => {
    const value = "value";
    const node = new Node(value);
    expect(node.value).toBe(value);
  });

  it("nextNode", () => {
    const node = new Node("value1");
    const nextNode = new Node("value2");
    node.nextNode = nextNode;
    expect(node.nextNode).toBe(nextNode);
  });
});
