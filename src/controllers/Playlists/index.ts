import type { APIResponse } from "types/HTTPService";
import { createServerError } from "utils/HTTPUtils";

export const getTracks = async (): Promise<APIResponse<string>> => {
  try {
    return { type: "right", value: { status: 200, content: "" } };
  } catch (error) {
    return { type: "left", value: createServerError<typeof error>(error) };
  }
};
