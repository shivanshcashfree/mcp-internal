import { makeApiCall, makeApiCallWithRetry } from "../lib/apiClient.js";
import { CASHFREE_API_BASE_URL } from "../config/constants.js";
export function createToolHandler(tool) {
    return async (args) => {
        try {
            const payload = tool.payloadMapper(args);
            const data = tool.enableRetry
                ? await makeApiCallWithRetry(CASHFREE_API_BASE_URL, tool.apiEndpoint, payload, tool.method ?? "POST", tool.maxRetries ?? 3, tool.backoffSeconds ?? 5)
                : await makeApiCall(CASHFREE_API_BASE_URL, tool.apiEndpoint, payload, tool.method ?? "POST");
            if (!data) {
                return {
                    isError: true,
                    content: [{ type: "text", text: "API call failed - no data returned" }],
                };
            }
            const formattedResponse = tool.responseFormatter(data);
            const responseText = typeof formattedResponse === 'string'
                ? formattedResponse
                : JSON.stringify(formattedResponse, null, 2);
            return {
                content: [
                    { type: "text", text: responseText },
                ],
            };
        }
        catch (error) {
            return {
                isError: true,
                content: [{ type: "text", text: `Error: ${error.message}` }],
            };
        }
    };
}
