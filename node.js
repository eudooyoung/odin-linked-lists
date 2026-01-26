class Node {
  value = null;
  nextNode = null;

  constructor(value, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

export default Node;
