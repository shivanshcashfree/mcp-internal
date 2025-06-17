import { z } from "zod";
import { formatDateTimeForCashfree } from "../../lib/formatters.js";
const getIncidents = {
    name: "getIncidents",
    description: "Retrieves payment gateway incidents (scheduled and unscheduled downtimes) for a specified time period. Returns incident details including type, status, impact level, affected payment methods, and resolution times.",
    apiEndpoint: "/pgincidentsvc/v1/incidents/search",
    inputSchema: z.object({
        incidentStartTime: z.string().describe("Incident start time (YYYY-MM-DD HH:MM:SS)"),
        incidentEndTime: z.string().describe("Incident end time (YYYY-MM-DD HH:MM:SS)"),
    }),
    method: "GET",
    payloadMapper: (args) => ({
        incidentType: "SCHEDULED,UNSCHEDULED",
        userVisibleStatus: "RESOLVED",
        incidentStartTime: formatDateTimeForCashfree(args.incidentStartTime),
        incidentEndTime: formatDateTimeForCashfree(args.incidentEndTime),
        pageNo: "0",
        pageSize: "100",
        isMerchantIdNotRequired: "true",
    }),
    responseFormatter: (data) => {
        if (!data || !data.content) {
            return "No incidents found for the specified time period.";
        }
        const incidents = data.content;
        const totalIncidents = data.totalElements || incidents.length;
        const formattedIncidents = incidents.map((incident) => ({
            incidentId: incident.incidentId,
            type: incident.incidentType,
            status: incident.userVisibleStatus,
            impact: incident.incidentImpact,
            startTime: incident.incidentStartTime,
            endTime: incident.incidentEndTime,
            description: incident.description,
            affectedPaymentMethods: incident.incidentData?.detailsV2?.paymentGroups || [],
            affectedPGs: incident.incidentData?.detailsV2?.pgs || [],
            issuer: incident.incidentData?.detailsV2?.issuer,
        }));
        return `Payment Gateway Incidents (${totalIncidents} total):\n${JSON.stringify(formattedIncidents, null, 2)}`;
    },
};
export default getIncidents;
