import type { ServerError } from "../types/HTTPService";

export const isServerError = <T>(error: T): boolean => {
  return error instanceof Object && "status" in error;
};

export const handleServerError = <T>(error: T) => {
  if (isServerError(error)) {
    const errorResponse = error as ServerError;
    console.info(errorResponse.status);
    console.error(errorResponse.message);
    return;
  }

  console.error(error);
};
