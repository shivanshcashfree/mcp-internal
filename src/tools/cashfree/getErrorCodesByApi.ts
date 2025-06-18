import { z } from "zod";
import { formatDateForDexter } from "../../lib/formatters.js";
import { baseDexterToolArgs } from "../types.js";
import { ApiToolConfig } from "./types.js";

// Schema for the input args (extends base with required path and method)
const getErrorCodesByApiArgs = baseDexterToolArgs.extend({
  path: z.string().describe("API path (e.g., /orders/sessions)"),
  method: z.string().describe("HTTP method (e.g., POST, GET)"),
});

// Response schema for getErrorCodesByApi
export const getErrorCodesByApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.array(z.object({
    map: z.object({
      error_code: z.string(),
      count: z.string(),
    }),
    empty: z.boolean(),
  })),
});

const getErrorCodesByApi: ApiToolConfig = {
  name: "getErrorCodesByApi",
  description: "Get error codes by API: requires path and method from getErrorByApi tool. Returns specific error codes with counts for the given API endpoint. The error codes returned will be required along with the path and method by the getErrorMessageByCode tool for detailed error analysis.",
  apiEndpoint: "/dashboardinternalsvc/v1/dexter/pg/get-error-codes-by-api",
  inputSchema: getErrorCodesByApiArgs,
  payloadMapper: (args) => ({
    merchant_id: args.merchantId,
    start_date: formatDateForDexter(args.startDate),
    end_date: formatDateForDexter(args.endDate),
    path: args.path,
    method: args.method,
  }),
  responseFormatter: (data) => {
    return getErrorCodesByApiResponseSchema.parse(data);
  },
};

export default getErrorCodesByApi;