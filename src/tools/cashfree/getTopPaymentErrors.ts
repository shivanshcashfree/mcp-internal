import { z } from "zod";
import { formatDateTimeForCashfree } from "../../lib/formatters.js";
import { baseCashfreeToolArgs } from "../types.js";
import { ApiToolConfig } from "./types.js";

const getTopPaymentErrors: ApiToolConfig = {
  name: "getTopPaymentErrors",
  description:
    "Get high-frequency payment error causes categorized by source, mode, and platform context.",
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
  responseFormatter: (data) =>
    `Top Payment Errors:\n${JSON.stringify(data, null, 2)}`,
};

export default getTopPaymentErrors;