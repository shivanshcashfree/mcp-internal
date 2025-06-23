import { z } from "zod";
// Input schema for getCustomerDistribution
export const customerDistributionToolArgs = z.object({
    merchantId: z.number().describe("Merchant ID"),
});
// Response schema for getCustomerDistribution
export const getCustomerDistributionResponseSchema = z.object({
    repeatCustomerDetails: z.object({
        lastSevenDaysRepeatCustomers: z.number(),
        lastSevenDaysIntervalRepeatCustomer: z.number(),
        lastThirtyDaysRepeatCustomer: z.number(),
        lastThirtyDaysIntervalRepeatCustomers: z.number(),
        lastThirtyDaysIntervalAllCustomers: z.number(),
        lastSevenDaysAllCustomers: z.number(),
        lastSevenDaysIntervalAllCustomers: z.number(),
        lastThirtyDaysAllCustomers: z.number(),
    }),
    uniqueCustomerDetails: z.object({
        lastSevenDaysUniqueCustomers: z.number(),
        lastSevenDaysIntervalUniqueCustomer: z.number(),
        lastThirtyDaysUniqueCustomer: z.number(),
        lastThirtyDaysIntervalUniqueCustomers: z.number(),
        lastThirtyDaysIntervalAllCustomers: z.number(),
        lastSevenDaysAllCustomers: z.number(),
        lastSevenDaysIntervalAllCustomers: z.number(),
        lastThirtyDaysAllCustomers: z.number(),
    }),
});
const getCustomerDistribution = {
    name: "getCustomerDistribution",
    description: "Retrieves customer distribution analytics for a specific merchant, including repeat customer metrics and unique customer statistics over 7-day and 30-day periods. Provides insights into customer retention, return rates, and customer base growth patterns.",
    apiEndpoint: "/dexter-report/v1/router/customer/distribution",
    inputSchema: customerDistributionToolArgs,
    method: "GET",
    payloadMapper: (args) => ({
        // The merchantId will be appended to the URL in the tool handler
        _merchantIdForUrl: args.merchantId,
    }),
    responseFormatter: (data) => {
        return getCustomerDistributionResponseSchema.parse(data);
    }
};
export default getCustomerDistribution;
