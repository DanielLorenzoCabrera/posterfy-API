export type Either<T, K> =
  | { type: "left"; value: T }
  | { type: "right"; value: K };
