import getInternalAnalytics from "./getInternalAnalytics.js";
import getMerchantByName from "./getMerchantByName.js";
import getTopPaymentErrors from "./getTopPaymentErrors.js";
export const cashfreeApiDefinitions = [
    getMerchantByName,
    getInternalAnalytics,
    getTopPaymentErrors,
];
export default cashfreeApiDefinitions;
export { getInternalAnalytics, getMerchantByName, getTopPaymentErrors, };
