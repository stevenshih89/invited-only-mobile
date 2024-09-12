type Func<T> = (input: T) => T;

export function pipe<T>(...functions: Array<Func<T>>): Func<T> {
  return (input: T): T => {
    return functions.reduce((acc, func) => func(acc), input);
  };
}
