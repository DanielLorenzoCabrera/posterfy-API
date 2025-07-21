import type { Either } from "./Common";

export type ServerError = {
  status: number;
  message: string;
};

export type APIResponse<T> = Either<
  ServerError,
  { status: number; content: T }
>;
