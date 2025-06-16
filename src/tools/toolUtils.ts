import { makeApiCall } from "../lib/apiClient.js";
import { CASHFREE_API_BASE_URL } from "../config/constants.js";
import { ApiToolConfig } from "./cashfree/types.js";

export function createToolHandler(tool: ApiToolConfig<any>) {
  return async (args: any) => {
    try {
      const payload = tool.payloadMapper(args);

      const data = await makeApiCall(
        CASHFREE_API_BASE_URL,
        tool.apiEndpoint,
        payload,
        tool.method ?? "POST",
      );
      
      if (!data) {
        return {
          isError: true,
          content: [{ type: "text" as const, text: "API call failed - no data returned" }],
        };
      }

      return {
        content: [
          { type: "text" as const, text: tool.responseFormatter(data) },
        ],
      };
    } catch (error: any) {
      return {
        isError: true,
        content: [{ type: "text" as const, text: `Error: ${error.message}` }],
      };
    }
  };
}
