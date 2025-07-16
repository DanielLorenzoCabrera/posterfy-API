export type ServerError = {
  status: number;
  message: string;
};

export type APIResponse<T> = Promise<
  ServerError | { status: number; content: T }
>;
