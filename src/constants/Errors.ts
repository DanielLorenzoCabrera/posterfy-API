import type { ServerError } from "types/HTTPService";

export const ERRORS: Record<string, ServerError> = {
  UNAUTHORIZED: {
    status: 401,
    message: "Authentication credentials missing or invalid.",
  },
  FORBIDDEN: {
    status: 403,
    message: "You do not have permission to access this resource.",
  },
  INTERNAL_ERROR: {
    status: 500,
    message: "Something went wrong on the server.",
  },
};
