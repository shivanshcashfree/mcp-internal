import getInternalAnalytics from "./getInternalAnalytics.js";
import getMerchantByName from "./getMerchantByName.js";
import getTopPaymentErrors from "./getTopPaymentErrors.js";
import getIncidents from "./getIncidents.js";
import getErrorByApi from "./getErrorByApi.js";
import getErrorCodesByApi from "./getErrorCodesByApi.js";
import getErrorMessageByCode from "./getErrorMessageByCode.js";
import getOrderAnalytics from "./getOrderAnalytics.js";
import getCustomerDistribution from "./getCustomerDistribution.js";
import getErrorAggregates from "./getErrorAggregates.js";
import getPerformanceSummary from "./getPerformanceSummary.js";
import getCustomerInsights from "./getCustomerInsights.js";
import { ApiToolConfig } from "./types.js";

export const cashfreeApiDefinitions: ApiToolConfig[] = [
  getMerchantByName,
  getInternalAnalytics,
  getTopPaymentErrors,
  getIncidents,
  getErrorByApi,
  getErrorCodesByApi,
  getErrorMessageByCode,
  getCustomerInsights,
  getCustomerDistribution,
  getPerformanceSummary,
  getErrorAggregates,
  getOrderAnalytics,
];

export default cashfreeApiDefinitions;
export {
  getInternalAnalytics,
  getMerchantByName,
  getTopPaymentErrors,
  getIncidents,
  getErrorByApi,
  getErrorCodesByApi,
  getErrorMessageByCode,
  getCustomerInsights,
  getCustomerDistribution,
  getPerformanceSummary,
  getErrorAggregates,
  getOrderAnalytics,
  ApiToolConfig,
};
