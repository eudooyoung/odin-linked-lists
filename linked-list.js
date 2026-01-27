import Node from "./node.js";

class LinkedList {
  // _head;
  // _tail;

  append(value) {
    const newNode = new Node(value);
    if (this.size() === 0) {
      this.head = this.tail = newNode;
    } else {
      this.tail.nextNode = newNode;
      this.tail = newNode;
    }
  }

  prepend(value) {
    const newNode = new Node(value);
    if (this.size() === 0) {
      this.head = this.tail = newNode;
    } else {
      newNode.nextNode = this.head;
      this.head = newNode;
    }
  }

  size() {
    if (!this.head && !this.tail) {
      return 0;
    }

    let currentNode = this.head;
    let count = 1;
    while (currentNode.nextNode) {
      currentNode = currentNode.nextNode;
      count++;
    }
    return count;
  }

  at(index) {
    if (index < 0 || index >= this.size()) {
      return;
    }

    let currentNode = this.head;
    for (let i = index; i > 0; i--) {
      currentNode = currentNode.nextNode;
    }
    return currentNode;
  }

  pop() {
    if (this.size() === 0) {
      return;
    }

    const currentHead = this.head;
    if (this.size() === 1) {
      this.head = null;
      return currentHead;
    }

    const newHead = currentHead.nextNode;
    this.head = newHead;
    return currentHead;
  }

  contains(value) {
    let currentNode = this.head;
    for (let i = 0; i < this.size(); i++) {
      if (currentNode.value === value) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }

    return false;
  }

  findIndex(value) {
    let currentNode = this.head;
    let i = 0;
    for (; i < this.size(); i++) {
      if (currentNode.value === value) {
        return i;
      }

      currentNode = currentNode.nextNode;
    }
    return -1;
  }

  toString() {
    let str = "";
    if (this.size() === 0) {
      return str;
    }

    for (let i = 0; i < this.size(); i++) {
      str += `( ${this.at(i).value} ) -> `;
    }
    str += "null";
    return str;
  }

  insertAt(index, ...values) {
    if (index < 0 || index > this.size()) {
      throw new RangeError(`index ${index} is out of bound`);
    }

    const arr = [...values];

    if (index === 0) {
      arr.toReversed().forEach((value) => this.prepend(value));
      return;
    }

    if (index === this.size()) {
      arr.forEach((value) => this.append(value));
      return;
    }

    const nodeBefore = this.at(index - 1);
    const nodeAfter = nodeBefore.nextNode;
    const subList = new LinkedList();
    arr.forEach((value) => subList.append(value));

    nodeBefore.nextNode = subList.head;
    subList.tail.nextNode = nodeAfter;
  }

  removeAt(index) {
    if (index < 0 || index >= this.size()) {
      throw new RangeError(`index ${index} is out of bound`);
    }

    if (index === 0) {
      this.pop();
      return;
    }

    const nodeBefore = this.at(index - 1);
    const nodeAfter = nodeBefore.nextNode.nextNode;
    nodeBefore.nextNode = nodeAfter;
    if (index === this.size() - 1) {
      this.tail = nodeBefore;
    }
  }
}

export default LinkedList;

