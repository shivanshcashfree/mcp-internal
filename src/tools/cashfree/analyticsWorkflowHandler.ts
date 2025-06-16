import { makeApiCall } from "../../lib/apiClient.js";
import { CASHFREE_API_BASE_URL } from "../../config/constants.js";
import { formatDateTimeForCashfree } from "../../lib/formatters.js";

interface MerchantLookupArgs {
  merchantName: string;
  startDateTime: string;
  endDateTime: string;
  timeRange: number;
  duration: string;
  aggregateTerm?: string;
  filter?: Record<string, any>;
}

interface Merchant {
  id: number;
  merchantName: string;
  merchantEmail: string;
  merchantPhone: string;
  paymentActive: number;
  accountAlias?: string;
  addedOn: string;
  contactPerson: string;
  merchantLogo: string;
  accountState: string;
  merchantSiteUrl: string;
  merchantContact: string;
  merchantType: string;
  basicKYC: number;
  accountManagerId: number;
  countryCode: string;
  riskLevel: string | null;
}

interface MerchantLookupResponse {
  content: Merchant[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export async function handleAnalyticsByMerchantName(args: any) {
  try {
    // Step 1: Look up merchant by name
    const merchantLookupPayload = {
      merchantName: args.merchantName,
      pageSize:100,
    };

    const merchantData = await makeApiCall(
      CASHFREE_API_BASE_URL,
      "/commonmerchantsvc/merchants",
      merchantLookupPayload,
      "GET",
    ) as MerchantLookupResponse;

    if (!merchantData || !merchantData.content || merchantData.content.length === 0) {
      return {
        isError: true,
        content: [{ 
          type: "text" as const, 
          text: `No merchants found with name "${args.merchantName}". Please check the merchant name and try again.` 
        }],
      };
    }

    const merchants = merchantData.content;

    // Step 2: Handle single vs multiple merchants
    if (merchants.length === 1) {
      const merchant = merchants[0];
      
      // Step 3: Automatically proceed with analytics for single merchant
      const analyticsPayload = {
        aggregateTerm: args.aggregateTerm ?? "PAYMENT_METHOD",
        startDateTime: formatDateTimeForCashfree(args.startDateTime),
        endDateTime: formatDateTimeForCashfree(args.endDateTime),
        timeRange: args.timeRange,
        duration: args.duration,
        merchantId: merchant.id,
        filter: args.filter ?? {},
      };

      const analyticsData = await makeApiCall(
        CASHFREE_API_BASE_URL,
        "/dexter-report/v1/router/analytics/transaction",
        analyticsPayload,
        "POST",
      );

      if (!analyticsData) {
        return {
          isError: true,
          content: [{ 
            type: "text" as const, 
            text: "Failed to fetch analytics data. Please try again." 
          }],
        };
      }

      const response = `Found merchant: ${merchant.merchantName} (ID: ${merchant.id})
Analytics Results:
${JSON.stringify(analyticsData, null, 2)}`;

      return {
        content: [{ type: "text" as const, text: response }],
      };
    } else {
      // Multiple merchants found - display them for selection
      const totalElements = merchantData.totalElements || merchants.length;
      let response = `Found ${totalElements} merchants matching "${args.merchantName}":\n\n`;
      
      merchants.forEach((merchant, index) => {
        response += `${index + 1}. Merchant ID: ${merchant.id}\n`;
      });

      response += `\nMultiple merchants found. Do not pickup the most frequent or old ID by yourself, instead please ask the user which merchant ID do they want to use for analytics by displaying all the ${totalElements} merchant IDs.`

      return {
        content: [{ type: "text" as const, text: response }],
      };
    }
  } catch (error: any) {
    return {
      isError: true,
      content: [{ type: "text" as const, text: `Error: ${error.message}` }],
    };
  }
}