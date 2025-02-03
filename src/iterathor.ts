export class Iterathor<T> {

  #iterator: IteratorObject<T>;

  constructor(iterator: IteratorObject<T>) {
    this.#iterator = iterator;

    if (this.#iterator.return) this.return = (value) => this.#iterator.return!(value);
    if (this.#iterator.throw) this.throw = (e) => this.#iterator.throw!(e);
  }

  static from<T>(value: Iterator<T> | Iterable<T>) {
    return new Iterathor(Iterator.from(value));
  }

  // Iterator methods

  next(...[value]: [] | [T]) {
    return this.#iterator.next(value);
  }

  return?(value?: unknown): IteratorResult<T, unknown>;

  throw?(e?: any): IteratorResult<T>;

  [Symbol.iterator]() {
    return this.#iterator.next();
  }

  // IteratorObject methods

  drop(count: number) {
    return new Iterathor(this.#iterator.drop(count));
  }

  every(predicate: (value: T, index: number) => unknown) {
    return this.#iterator.every(predicate);
  }

  filter<S extends T>(predicate: (value: T, index: number) => value is S): Iterathor<S>;
  filter(predicate: (value: T, index: number) => unknown): Iterathor<T>;
  filter(predicate: (value: T, index: number) => unknown) {
    return new Iterathor(this.#iterator.filter(predicate));
  }

  find<S extends T>(predicate: (value: T, index: number) => value is S): S | undefined;
  find(predicate: (value: T, index: number) => unknown): T | undefined;
  find(predicate: (value: T, index: number) => unknown) {
    return this.#iterator.find(predicate);
  }

  flatMap<U>(callback: (value: T, index: number) => Iterator<U, unknown, undefined> | Iterable<U, unknown, undefined>) {
    return new Iterathor(this.#iterator.flatMap(callback));
  }

  forEach(callbackFn: (value: T, index: number) => void) {
    this.#iterator.forEach(callbackFn);
  }

  map<U>(callbackFn: (value: T, index: number) => U) {
    return new Iterathor(this.#iterator.map(callbackFn));
  }

  reduce<U>(callbackFn: (previousValue: U, currentValue: T, currentIndex: number) => U, initialValue: U) {
    return this.#iterator.reduce(callbackFn, initialValue);
  }

  some(predicate: (value: T, index: number) => unknown) {
    return this.#iterator.some(predicate);
  }

  take(limit: number) {
    return new Iterathor(this.#iterator.take(limit));
  }

  toArray() {
    return this.#iterator.toArray();
  }

  readonly [Symbol.toStringTag] = 'Iterathor';

  // Iterathor methods

  count() {
    return this.#iterator.reduce((count) => count + 1, 0);
  }
}
