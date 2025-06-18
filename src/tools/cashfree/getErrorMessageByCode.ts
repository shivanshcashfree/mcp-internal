import { z } from "zod";
import { formatDateForDexter } from "../../lib/formatters.js";
import {  extendedDexterToolArgs } from "../types.js";
import { ApiToolConfig } from "./types.js";

// Schema for the input args (extends base with required path, method, and error_code)

// Response schema for getErrorMessageByCode
export const getErrorMessageByCodeResponseSchema = z.object({
  success: z.boolean(),
  message: z.array(z.object({
    map: z.object({
      message: z.string(),
    }),
    empty: z.boolean(),
  })),
});

const getErrorMessageByCode: ApiToolConfig = {
  name: "getErrorMessageByCode",
  description: "Get detailed error messages by error code: requires path, method from getErrorByApi tool and error code from getErrorCodesByApi tool. This is the final step in the error analysis flow, providing detailed error messages and context for specific error occurrences.",
  apiEndpoint: "/dashboardinternalsvc/v1/dexter/pg/get-error-message-by-code",
  inputSchema: extendedDexterToolArgs,
  payloadMapper: (args) => ({
    merchant_id: args.merchantId,
    start_date: formatDateForDexter(args.startDate),
    end_date: formatDateForDexter(args.endDate),
    path: args.path,
    method: args.method,
    error_code: args.errorCode,
    limit:10,
    page_number:0
  }),
  responseFormatter: (data) => {
    return getErrorMessageByCodeResponseSchema.parse(data);
  },
};

export default getErrorMessageByCode;