import getInternalAnalytics from "./getInternalAnalytics.js";
import getMerchantByName from "./getMerchantByName.js";
import getTopPaymentErrors from "./getTopPaymentErrors.js";
import getIncidents from "./getIncidents.js";
import { ApiToolConfig } from "./types.js";

export const cashfreeApiDefinitions: ApiToolConfig[] = [
  getMerchantByName,
  getInternalAnalytics,
  getTopPaymentErrors,
  getIncidents,
];

export default cashfreeApiDefinitions;
export {
  getInternalAnalytics,
  getMerchantByName,
  getTopPaymentErrors,
  getIncidents,
  ApiToolConfig,
};
