import { z } from "zod";
import { ApiToolConfig } from "./types.js";

// Response schema for getMerchantByName
export const getMerchantByNameResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  merchants: z.array(z.object({
    id: z.number(),
    name: z.string()
  })),
  totalCount: z.number()
});

const getMerchantByName: ApiToolConfig = {
  name: "getMerchantByName",
  description: "Converts merchant name to merchant ID. Use this tool when the user provides a merchant name instead of a merchant ID. Returns one or more merchant IDs that match the provided merchant name.",
  apiEndpoint: "/commonmerchantsvc/merchants",
  inputSchema: z.object({
    merchantName: z.string().describe("Merchant name to search for"),
  }),
  method: "GET",
  payloadMapper: (args) => ({
    merchantName: args.merchantName,
    pageSize:100,
  }),
  responseFormatter: (data: any) => {
    if (!data || !data.content) {
      const response = {
        success: false,
        message: "No merchants found with the given name.",
        merchants: [],
        totalCount: 0
      };
      return getMerchantByNameResponseSchema.parse(response);
    }

    const merchants = data.content;
    
    // Filter only active merchants (paymentActive = 1)
    const activeMerchants = merchants.filter((merchant: any) => merchant.paymentActive === 1);
    
    if (activeMerchants.length === 0) {
      const response = {
        success: false,
        message: "No active merchants found with the given name. Found merchants but they are not payment active.",
        merchants: [],
        totalCount: 0
      };
      return getMerchantByNameResponseSchema.parse(response);
    }

    const response = {
      success: true,
      message: `Found ${activeMerchants.length} active merchant${activeMerchants.length === 1 ? '' : 's'} matching the search. Do not pickup any ID by yourself, instead please ask the user which merchant ID do they want to use for analytics by listing all the ${activeMerchants}`,
      merchants: activeMerchants.map((merchant: any) => ({
        id: merchant.id,
        name: merchant.merchantName || merchant.name || 'Unknown'
      })),
      totalCount: activeMerchants.length,
    };
    
    return getMerchantByNameResponseSchema.parse(response);
  },
};

export default getMerchantByName;