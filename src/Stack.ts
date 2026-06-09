// Generischer LIFO-Stack: push, pop, peek, isEmpty, size.

export class Stack<T> {
  private items: T[] = [];

  push(value: T): void {
    this.items.push(value);
  }

  pop(): T {
    if (this.isEmpty()) {
      throw new Error("pop() auf leerem Stack");
    }
    return this.items.pop()!;
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error("peek() auf leerem Stack");
    }
    return this.items[this.items.length - 1]!;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}
