import { z } from "zod";
import { ApiToolConfig } from "./types.js";

// Response schema for performance summary
export const getPerformanceSummaryResponseSchema = z.array(
  z.object({
    paymentGateway: z.string(),
    paymentMethod: z.string(),
    totalSuccessfulTransactionsToday: z.number(),
    totalTransactionsToday: z.number(),
    volumeToday: z.number(),
    totalSuccessfulTransactionsYesterday: z.number(),
    totalTransactionsYesterday: z.number(),
    volumeYesterday: z.number(),
    totalTransactions: z.number(),
    totalSuccessfulTransactions: z.number(),
    amountSum: z.number(),
  })
);

const getPerformanceSummary: ApiToolConfig = {
  name: "getPerformanceSummary",
  description:
    "Fetches performance summary for a merchant by ID, including transaction and volume stats for today, yesterday, and overall, broken down by payment method.",
  apiEndpoint: "/dexter-report/v1/router/performance/summary", // base path only
  inputSchema: z.object({
    merchantId: z.number().describe("Merchant ID"),
  }),
  method: "GET",
  payloadMapper: (args) => ({
    _merchantIdForUrl: args.merchantId, // handled in toolUtils
  }),
  responseFormatter: (data) => {
    return getPerformanceSummaryResponseSchema.parse(data);
  },
};

export default getPerformanceSummary;