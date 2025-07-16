export type ServerError = {
  status: number;
  message: string;
};

export type APIResponse<T> = Promise<T>;
