import getInternalAnalytics from "./getInternalAnalytics.js";
import getMerchantByName from "./getMerchantByName.js";
import getTopPaymentErrors from "./getTopPaymentErrors.js";
import getIncidents from "./getIncidents.js";
import getErrorByApi from "./getErrorByApi.js";
import getErrorCodesByApi from "./getErrorCodesByApi.js";
import getErrorMessageByCode from "./getErrorMessageByCode.js";
import backoff from "./backoff.js";
import { ApiToolConfig } from "./types.js";

export const cashfreeApiDefinitions: ApiToolConfig[] = [
  getMerchantByName,
  getInternalAnalytics,
  getTopPaymentErrors,
  getIncidents,
  getErrorByApi,
  getErrorCodesByApi,
  getErrorMessageByCode,
  backoff,
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
  backoff,
  ApiToolConfig,
};
