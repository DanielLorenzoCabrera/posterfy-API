import { ERRORS } from "constants/Errors";
import type { ServerError } from "types/HTTPService";

export const isServerError = <T>(error: T): boolean => {
  return error instanceof Object && "status" in error;
};

export const handleServerError = <T>(error: T): ServerError => {
  if (isServerError(error)) {
    const errorResponse = error as ServerError;
    console.info(errorResponse.status);
    console.error(errorResponse.message);
    return errorResponse;
  }

  return ERRORS.INTERNAL_ERROR;
};
