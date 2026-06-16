// Generischer LIFO-Stack: push, pop, peek, isEmpty, size, length.
// Bewusst ohne eingebaute Array-Funktionen (push/pop/.length) implementiert –
// die Elemente liegen in einem Objekt, count zählt selbst mit.

export class Stack<T> {
  private items: Record<number, T> = {};
  private count = 0;

  push(value: T): void {
    this.items[this.count] = value;
    this.count++;
  }

  pop(): T {
    if (this.isEmpty()) throw new Error("pop() auf leerem Stack");

    const value = this.peek();
    this.count--;
    delete this.items[this.count];
    return value;
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error("peek() auf leerem Stack");
    }
    return this.items[this.count - 1]!;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  size(): number {
    return this.count;
  }

  get length(): number {
    return this.count;
  }
}
