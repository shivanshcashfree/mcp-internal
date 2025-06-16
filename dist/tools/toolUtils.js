import { makeApiCall } from "../lib/apiClient.js";
import { CASHFREE_API_BASE_URL, BEARER_TOKEN } from "../config/constants.js";
export function createToolHandler(tool) {
    return async (args) => {
        try {
            const payload = tool.payloadMapper(args);
            const data = await makeApiCall(CASHFREE_API_BASE_URL, tool.apiEndpoint, payload, `Bearer ${BEARER_TOKEN}`, tool.method ?? "POST");
            return {
                content: [
                    { type: "text", text: tool.responseFormatter(data) },
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
