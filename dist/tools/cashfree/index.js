import getInternalAnalytics from "./getInternalAnalytics.js";
import getMerchantByName from "./getMerchantByName.js";
import getTopPaymentErrors from "./getTopPaymentErrors.js";
import getIncidents from "./getIncidents.js";
export const cashfreeApiDefinitions = [
    getMerchantByName,
    getInternalAnalytics,
    getTopPaymentErrors,
    getIncidents,
];
export default cashfreeApiDefinitions;
export { getInternalAnalytics, getMerchantByName, getTopPaymentErrors, getIncidents, };
