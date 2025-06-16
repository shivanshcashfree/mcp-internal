import getInternalAnalytics from "./getInternalAnalytics.js";
import getMerchantByName from "./getMerchantByName.js";
import getAnalyticsByMerchantName from "./getAnalyticsByMerchantName.js";
export const cashfreeApiDefinitions = [
    getMerchantByName,
    getInternalAnalytics,
    getAnalyticsByMerchantName
];
export default cashfreeApiDefinitions;
export { getInternalAnalytics, getMerchantByName, getAnalyticsByMerchantName, };
