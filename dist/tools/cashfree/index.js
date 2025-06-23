import getInternalAnalytics from "./getInternalAnalytics.js";
import getMerchantByName from "./getMerchantByName.js";
import getTopPaymentErrors from "./getTopPaymentErrors.js";
import getIncidents from "./getIncidents.js";
import getErrorByApi from "./getErrorByApi.js";
import getErrorCodesByApi from "./getErrorCodesByApi.js";
import getErrorMessageByCode from "./getErrorMessageByCode.js";
import getOrderAnalytics from "./getOrderAnalytics.js";
import getCustomerDistribution from "./getCustomerDistribution.js";
export const cashfreeApiDefinitions = [
    getMerchantByName,
    getInternalAnalytics,
    getTopPaymentErrors,
    getIncidents,
    getErrorByApi,
    getErrorCodesByApi,
    getErrorMessageByCode,
    getOrderAnalytics,
    getCustomerDistribution,
];
export default cashfreeApiDefinitions;
export { getInternalAnalytics, getMerchantByName, getTopPaymentErrors, getIncidents, getErrorByApi, getErrorCodesByApi, getErrorMessageByCode, getOrderAnalytics, getCustomerDistribution, };
