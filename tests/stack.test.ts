// Stack: LIFO-Reihenfolge, Restzustand nach pop, leerer Stack (pop/peek
// werfen), isEmpty(), size().

import { describe, it, expect } from "bun:test";
import { Stack } from "../src/Stack.js";

describe("Stack", () => {
  it("push/pop folgt dem LIFO-Prinzip", () => {
    const s = new Stack<number>();
    s.push(1);
    s.push(2);
    s.push(3);
    expect(s.pop()).toBe(3);
    expect(s.pop()).toBe(2);
    expect(s.pop()).toBe(1);
  });

  it("peek liefert das oberste Element, ohne es zu entfernen", () => {
    const s = new Stack<number>();
    s.push(1);
    s.push(2);
    expect(s.peek()).toBe(2);
    expect(s.peek()).toBe(2); // zweimal abgefragt -> immer noch da
    expect(s.size()).toBe(2);
  });

  it("isEmpty ist anfangs true und nach push false", () => {
    const s = new Stack<string>();
    expect(s.isEmpty()).toBe(true);
    s.push("a");
    expect(s.isEmpty()).toBe(false);
  });

  it("size zählt die enthaltenen Elemente", () => {
    const s = new Stack<number>();
    expect(s.size()).toBe(0);
    s.push(10);
    s.push(20);
    expect(s.size()).toBe(2);
    s.pop();
    expect(s.size()).toBe(1);
  });

  it("pop auf leerem Stack wirft einen Fehler", () => {
    const s = new Stack<number>();
    expect(() => s.pop()).toThrow();
  });

  it("peek auf leerem Stack wirft einen Fehler", () => {
    const s = new Stack<number>();
    expect(() => s.peek()).toThrow();
  });
});
