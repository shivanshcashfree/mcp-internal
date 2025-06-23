import { z } from "zod";
import { formatDateTimeForCashfree } from "../../lib/formatters.js";
import { baseCashfreeToolArgs } from "../types.js";
import { ApiToolConfig } from "./types.js";

// Response schema for getErrorAggregates
export const getErrorAggregatesResponseSchema = z.object({
  currentTime: z.string(),
  totalCount: z.number(),
  totalFavourableCount: z.number(),
  totalAmount: z.number(),
  rate: z.number(),
  changeRate: z.number(),
  currentWeekRate: z.number(),
  weekChangeRate: z.number(),
  currentDayRate: z.number(),
  dayChangeRate: z.number(),
  errorSourceAggregates: z.array(z.object({
    source: z.string(),
    errorCount: z.number(),
    errorRate: z.number(),
  })),
  data: z.array(z.object({
    category: z.string(),
    nextAggregateTerm: z.string(),
    filterTerm: z.string(),
    totalCount: z.number(),
    totalSuccessfulCount: z.number(),
    totalAmount: z.number(),
    dataPoints: z.array(z.object({
      startTime: z.string(),
      count: z.number(),
      successfulCount: z.number(),
      amount: z.number(),
      technicalDeclineCount: z.number(),
      userDeclineCount: z.number(),
      bankDeclineCount: z.number(),
      successRate: z.number(),
      successRateWithoutUD: z.number(),
      userDeclineRate: z.number(),
      technicalDeclineRate: z.number(),
      bankDeclineRate: z.number(),
    }))
  }))
});

const getErrorAggregates: ApiToolConfig = {
  name: "getErrorAggregates",
  description: 
    `Retrieves comprehensive error analytics and aggregates for payment transactions, including error source breakdowns, decline rates by category, and time-series error analysis. Provides detailed insights into technical declines, user declines, bank declines, and overall error patterns across different payment methods and platforms.

WORKFLOW: If user provides merchant name, first use getMerchantByName tool to get the merchant ID, then use this tool.

PAYMENT METHOD FILTERS:
- paymentMethod: "UPI", "NET_BANKING", "CARD"

UPI-specific filters:
- paymentMethodType: "UPI_COLLECT", "UPI_INTENT"  
- platform: "ANDROID", "IOS", "WEB", "S2S"

NET_BANKING-specific filters:
- platform: "ANDROID", "IOS", "WEB", "S2S"

CARD-specific filters:
- paymentMethodType: "CREDIT_CARD", "DEBIT_CARD"
- cardType: "rupay", "mastercard", "visa", "maestro"
- customerBank: specify bank name (e.g., "qrcode")
- platform: "ANDROID", "IOS", "WEB", "S2S"

KEY METRICS:
- Error source aggregates (Customer, Merchant, System errors)
- Decline rate analysis by type (Technical, User, Bank)
- Success rates with and without user declines
- Time-series error trends and change rates`,
  apiEndpoint: "/dexter-report/v1/router/analytics/errors/aggregates",
  inputSchema: baseCashfreeToolArgs.extend({
    failedReasonAggRequired: z.boolean().optional().default(true).describe("Include failed reason aggregation"),
    filter: z.record(z.any()).optional().default({}),
  }),
  payloadMapper: (args) => ({
    aggregateTerm: args.aggregateTerm ?? "PAYMENT_METHOD",
    startDateTime: formatDateTimeForCashfree(args.startDateTime),
    endDateTime: formatDateTimeForCashfree(args.endDateTime),
    timeRange: args.timeRange,
    duration: args.duration,
    failedReasonAggRequired: args.failedReasonAggRequired ?? true,
    merchantId: args.merchantId,
    filter: args.filter ?? {},
  }),
  responseFormatter: (data) => {
    return getErrorAggregatesResponseSchema.parse(data);
  }
};

export default getErrorAggregates;
