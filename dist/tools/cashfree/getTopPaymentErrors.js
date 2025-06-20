import { z } from "zod";
import { formatDateTimeForCashfree } from "../../lib/formatters.js";
import { baseCashfreeToolArgs } from "../types.js";
// Response schema for getTopPaymentErrors (adapted to actual response)
export const getTopPaymentErrorsResponseSchema = z.object({
    message: z.string().nullable(),
    transactionErrorDetails: z.array(z.object({
        errorDescription: z.string(),
        source: z.string(),
        errorRate: z.union([z.string(), z.number()]),
        errorCount: z.union([z.string(), z.number()]),
        pg: z.string(),
        paymentMode: z.string(),
    })),
});
const getTopPaymentErrors = {
    name: "getTopPaymentErrors",
    description: "Get high-frequency payment error causes categorized by source, mode, and platform context.",
    apiEndpoint: "/dexter-report/v1/router/analytics/top-errors",
    inputSchema: baseCashfreeToolArgs.extend({
        paymentModes: z.array(z.string()).optional(),
        psps: z.array(z.string()).optional(),
        paymentMethodAnalytics: z.any().optional(),
        paymentMethodAnalyticsTypes: z.any().optional(),
        customerBanks: z.any().optional(),
        cardType: z.string().optional(),
        platforms: z.array(z.string()).optional(),
    }),
    resources: ["docs://getTopPaymentErrors"],
    payloadMapper: (args) => ({
        startDateTime: formatDateTimeForCashfree(args.startDateTime),
        endDateTime: formatDateTimeForCashfree(args.endDateTime),
        merchantId: args.merchantId,
        paymentModes: args.paymentModes,
        psps: args.psps,
        paymentMethodAnalytics: args.paymentMethodAnalytics,
        paymentMethodAnalyticsTypes: args.paymentMethodAnalyticsTypes,
        customerBanks: args.customerBanks,
        cardType: args.cardType,
        platforms: args.platforms,
    }),
    responseFormatter: (data) => {
        // No need to add 'success' or 'status', just parse the raw response
        return getTopPaymentErrorsResponseSchema.parse(data);
    },
};
export default getTopPaymentErrors;
