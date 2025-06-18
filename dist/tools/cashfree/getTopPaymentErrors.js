import { z } from "zod";
import { formatDateTimeForCashfree } from "../../lib/formatters.js";
import { baseCashfreeToolArgs } from "../types.js";
// Response schema for getTopPaymentErrors
export const getTopPaymentErrorsResponseSchema = z.object({
    success: z.boolean(),
    status: z.string(),
    data: z.array(z.object({
        errorDescription: z.string(),
        source: z.string(),
        errorCount: z.union([z.string(), z.number()]),
        errorRate: z.union([z.string(), z.number()]),
        paymentMode: z.string(),
        pg: z.string(),
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
        const response = {
            success: true,
            ...data,
        };
        return getTopPaymentErrorsResponseSchema.parse(response);
    },
};
export default getTopPaymentErrors;
