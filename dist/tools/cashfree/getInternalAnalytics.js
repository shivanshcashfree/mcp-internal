import { z } from "zod";
import { formatDateTimeForCashfree } from "../../lib/formatters.js";
import { baseCashfreeToolArgs } from "../types.js";
// Response schema for getInternalAnalytics
export const getInternalAnalyticsResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().nullable(),
    currentTime: z.string(),
    totalCount: z.number(),
    totalSuccessfulCount: z.number(),
    totalAmount: z.number(),
    data: z.array(z.object({
        category: z.string(),
        nextAggregateTerm: z.string().optional(),
        filterTerm: z.string().optional(),
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
        }))
    }))
});
const getInternalAnalytics = {
    name: "getInternalAnalytics",
    description: `Retrieves detailed transaction analytics for a specific merchant ID, including payment method breakdowns, transaction counts, amounts, and success/failure rates over time. 

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
- platform: "ANDROID", "IOS", "WEB", "S2S"`,
    apiEndpoint: "/dexter-report/v1/router/analytics/transaction",
    inputSchema: baseCashfreeToolArgs.extend({
        filter: z.record(z.any()).optional().default({}),
    }),
    resources: ["docs://getInternalAnalytics"],
    payloadMapper: (args) => ({
        aggregateTerm: args.aggregateTerm ?? "PAYMENT_METHOD",
        startDateTime: formatDateTimeForCashfree(args.startDateTime),
        endDateTime: formatDateTimeForCashfree(args.endDateTime),
        timeRange: args.timeRange,
        duration: args.duration,
        merchantId: args.merchantId,
        filter: args.filter ?? {},
    }),
    responseFormatter: (data) => {
        const response = {
            success: true,
            ...data
        };
        return getInternalAnalyticsResponseSchema.parse(response);
    },
};
export default getInternalAnalytics;
