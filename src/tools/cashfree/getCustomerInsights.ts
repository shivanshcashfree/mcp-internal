import { z } from "zod";
import { ApiToolConfig } from "./types.js";

// Response schema for customer insights
export const getCustomerInsightsResponseSchema = z.object({
  totalSuccessfulTransactions: z.number(),
  totalTransactions: z.number(),
  totalAmount: z.number(),
  data: z.array(
    z.object({
      category: z.string(),
      totalTransactions: z.number(),
      totalSuccessfulTransactions: z.number(),
      volume: z.number(),
    })
  ),
});

const getCustomerInsights: ApiToolConfig = {
  name: "getCustomerInsights",
  description:
    "Fetches customer insights for a merchant, including transaction counts and volumes by category for a given date range.",
  apiEndpoint: "/dexter-report/v1/router/customer/insights",
  inputSchema: z.object({
    startDateTime: z.string().describe("Start date-time in 'YYYY-MM-DD HH:mm:ss' format"),
    endDateTime: z.string().describe("End date-time in 'YYYY-MM-DD HH:mm:ss' format"),
    merchantId: z.number().describe("Merchant ID"),
  }),
  method: "POST",
  payloadMapper: (args) => ({
    startDateTime: args.startDateTime,
    endDateTime: args.endDateTime,
    merchantId: args.merchantId,
  }),
  responseFormatter: (data) => {
    return getCustomerInsightsResponseSchema.parse(data);
  },
};

export default getCustomerInsights;