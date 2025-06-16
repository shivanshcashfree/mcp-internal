import { z } from "zod";
import { ApiToolConfig } from "./types.js";

const getAnalyticsByMerchantName: ApiToolConfig = {
  name: "getAnalyticsByMerchantName",
  description: `Get transaction analytics by merchant name. This tool will:
1. Look up merchant ID(s) from the provided merchant name
2. If multiple merchants are found, display them for selection
3. If a single merchant is found, automatically proceed with analytics
4. Return transaction metrics grouped by payment method with counts, amounts, and success/failure details

Note: If multiple merchants are found, you'll need to use the regular getInternalAnalytics tool with the specific merchant ID.`,
  apiEndpoint: "/dexter-report/v1/router/analytics/transaction", // This will be overridden in the handler
  inputSchema: z.object({
    merchantName: z.string().describe("Merchant name to search for"),
    startDateTime: z.string().describe("Start datetime (YYYY-MM-DD HH:MM:SS)"),
    endDateTime: z.string().describe("End datetime (YYYY-MM-DD HH:MM:SS)"),
    timeRange: z.number().describe("Time range"),
    duration: z.string().describe("Duration unit ('DAYS', 'HOURS')"),
    aggregateTerm: z.string().default("PAYMENT_METHOD").describe("Aggregation term(UPI_PSP,NET_BANKING_BANK_NAME,PAYMENT_METHOD,CARD_BANK_NAME,PLATFORM)"),
    filter: z.record(z.any()).optional().default({}),
  }),
  payloadMapper: (args) => args, // This will be handled in the custom handler
  responseFormatter: (data) => data, // This will be handled in the custom handler
};

export default getAnalyticsByMerchantName;