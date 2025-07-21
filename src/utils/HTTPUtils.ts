import { ERRORS } from "constants/Errors";
import type { ServerError } from "types/HTTPService";
import type { Response } from "express";

export const isServerError = <T>(error: T): boolean => {
  return error instanceof Object && "status" in error;
};

export const createServerError = <T>(error: T): ServerError => {
  if (isServerError(error)) {
    const errorResponse = error as ServerError;
    console.info(errorResponse.status);
    console.error(errorResponse.message);
    return errorResponse;
  }

  return ERRORS.INTERNAL_ERROR;
};

export const handleServerError = (error: ServerError, response: Response) => {
  const { status, message } = error;
  console.log("Error", error.status, error.message);
  return response.status(status).json({ message });
};
