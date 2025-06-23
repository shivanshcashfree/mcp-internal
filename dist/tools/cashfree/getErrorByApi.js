import { z } from "zod";
import { formatDateForDexter } from "../../lib/formatters.js";
import { baseDexterToolArgs } from "../types.js";
// Response schema for getErrorByApi
export const getErrorByApiResponseSchema = z.object({
    success: z.boolean(),
    message: z.array(z.object({
        map: z.object({
            path: z.string(),
            count: z.string(),
        }),
        empty: z.boolean(),
    })),
});
const getErrorByApi = {
    name: "getErrorByApi",
    description: "Get APIs that have errors: returns HTTP method (GET/POST/etc.) and API path with error counts. The returned path and method information is required by the getErrorCodesByApi tool for the next step in the error analysis flow.",
    apiEndpoint: "/dashboardinternalsvc/v1/dexter/pg/get-error-by-api",
    inputSchema: baseDexterToolArgs,
    payloadMapper: (args) => ({
        merchant_id: args.merchantId,
        start_date: formatDateForDexter(args.startDate),
        end_date: formatDateForDexter(args.endDate),
    }),
    responseFormatter: (data) => {
        return getErrorByApiResponseSchema.parse(data);
    },
    enableRetry: true,
    maxRetries: 3,
    backoffSeconds: 5,
};
export default getErrorByApi;
