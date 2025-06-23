import { z } from "zod";
import { formatDateTimeForCashfree } from "../../lib/formatters.js";
export const orderAnalyticsToolArgs = z.object({
    startDateTime: z.string().describe("Start datetime (YYYY-MM-DD HH:MM:SS)"),
    endDateTime: z.string().describe("End datetime (YYYY-MM-DD HH:MM:SS)"),
    merchantId: z.number().describe("Merchant ID"),
});
export const getOrderAnalyticsResponseSchema = z.object({
    totalOrdersCreated: z.number(),
    totalOrderHaveTransactions: z.number(),
    totalOrderHaveSuccessfulTransactions: z.number(),
    totalOrderAmount: z.number(),
    totalOrderHaveTransactionsAmount: z.number(),
    totalOrderHaveSuccessfulTransactionsAmount: z.number(),
});
const getOrderAnalytics = {
    name: "getOrderAnalytics",
    description: "Retrieves comprehensive order analytics for a specific merchant, including total orders created, orders with transactions, successful transactions, and associated amounts. Provides insights into order completion rates and transaction success metrics.",
    apiEndpoint: "/dexter-report/v1/router/analytics/order",
    inputSchema: orderAnalyticsToolArgs,
    payloadMapper: (args) => ({
        startDateTime: formatDateTimeForCashfree(args.startDateTime),
        endDateTime: formatDateTimeForCashfree(args.endDateTime),
        merchantId: args.merchantId,
    }),
    responseFormatter: (data) => {
        return getOrderAnalyticsResponseSchema.parse(data);
    }
};
export default getOrderAnalytics;
