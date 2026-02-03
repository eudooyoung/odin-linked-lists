import Node from "./node.js";

class LinkedList {
  length = 0;
  first = null;
  last = null;

  append = (value) => {
    if (this.length === 0) {
      this.first = this.last = new Node(value);
      this.length++;
      return;
    }
    const node = new Node(value);
    this.last.nextNode = node;
    this.last = node;

    this.length++;
  };

  prepend = (value) => {
    if (this.length === 0) {
      this.first = this.last = new Node(value);
      this.length++;
      return;
    }
    const node = new Node(value);
    node.nextNode = this.first;
    this.first = node;

    this.length++;
  };

  size = () => this.length;

  head = () => {
    if (!this.first) {
      return;
    }

    return this.first.value;
  };

  tail = () => {
    if (!this.last) {
      return;
    }

    return this.last.value;
  };

  at = (index) => {
    let current = this.first;
    while (index > 0 && current.nextNode) {
      current = current.nextNode;
      index--;
    }
    return index !== 0 ? undefined : current.value;
  };

  pop = () => {
    const top = this.head();
    if (!top) {
      return top;
    }
    this.first = this.first.nextNode;
    this.length--;
    return top;
  };

  contains = (value) => {
    let front = 0;
    let back = this.length - 1;
    while (front <= back) {
      if (this.at(front) === value || this.at(back) === value) {
        return true;
      }
      front++;
      back--;
    }
    return false;
  };

  findIndex = (value) => {
    let front = 0;
    let back = this.length - 1;
    while (front <= back) {
      if (this.at(front) === value) {
        return front;
      }
      if (this.at(back) === value) {
        return back;
      }
      front++;
      back--;
    }
    return -1;
  };

  toString = () => {
    if (this.length === 0) {
      return "";
    }
    let str = "";
    let idx = 0;
    while (idx < this.length) {
      str += `( ${this.at(idx)} ) -> `;
      idx++;
    }
    str += "null";
    return str;
  };

  insertAt = (index, ...values) => {
    if (index === 0) {
      for (let i = values.length - 1; i >= 0; i--) {
        this.prepend(values[i]);
      }
    }

    let previous = this.first;
    for (let i = 0; i < index - 1; i++) {
      previous = previous.nextNode;
    }
    const target = previous.nextNode;
    previous.nextNode = new Node(values[0]);
  };
}

export default LinkedList;
