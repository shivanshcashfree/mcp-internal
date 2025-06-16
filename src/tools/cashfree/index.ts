import getInternalAnalytics from "./getInternalAnalytics.js";
import getMerchantByName from "./getMerchantByName.js";
import getAnalyticsByMerchantName from "./getAnalyticsByMerchantName.js";
import { ApiToolConfig } from "./types.js";

export const cashfreeApiDefinitions: ApiToolConfig[] = [
  getMerchantByName,
  getInternalAnalytics,
  getAnalyticsByMerchantName
];

export default cashfreeApiDefinitions;
export {
  getInternalAnalytics,
  getMerchantByName,
  getAnalyticsByMerchantName,
  ApiToolConfig,
};
