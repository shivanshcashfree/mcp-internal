import { z } from "zod";
import { formatDateTimeForCashfree } from "../../lib/formatters.js";
// Response schema for getIncidents
export const getIncidentsResponseSchema = z.object({
    success: z.boolean(),
    totalIncidents: z.number(),
    incidents: z.array(z.object({
        incidentId: z.string(),
        type: z.string(),
        status: z.string(),
        impact: z.string().optional(),
        startTime: z.string(),
        endTime: z.string().optional(),
        description: z.string().optional(),
        affectedPaymentMethods: z.array(z.string()),
        affectedPGs: z.array(z.string()),
        issuer: z.string().optional(),
    })),
});
const getIncidents = {
    name: "getIncidents",
    description: "Retrieves payment gateway incidents (scheduled and unscheduled downtimes) for a specified time period. Returns incident details including type, status, impact level, affected payment methods, and resolution times.",
    apiEndpoint: "/pgincidentsvc/v1/incidents/search",
    inputSchema: z.object({
        incidentStartTime: z
            .string()
            .describe("Incident start time (YYYY-MM-DD HH:MM:SS)"),
        incidentEndTime: z
            .string()
            .describe("Incident end time (YYYY-MM-DD HH:MM:SS)"),
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
            const response = {
                success: false,
                totalIncidents: 0,
                incidents: [],
            };
            return getIncidentsResponseSchema.parse(response);
        }
        const incidents = data.content;
        const totalIncidents = data.totalElements || incidents.length;
        const formattedIncidents = incidents.map((incident) => ({
            incidentId: incident.incidentId || "",
            type: incident.incidentType || "",
            status: incident.userVisibleStatus || "",
            impact: incident.incidentImpact,
            startTime: incident.incidentStartTime || "",
            endTime: incident.incidentEndTime,
            description: incident.description,
            affectedPaymentMethods: incident.incidentData?.detailsV2?.paymentGroups || [],
            affectedPGs: incident.incidentData?.detailsV2?.pgs || [],
            issuer: incident.incidentData?.detailsV2?.issuer,
        }));
        const response = {
            success: true,
            totalIncidents,
            incidents: formattedIncidents,
        };
        return getIncidentsResponseSchema.parse(response);
    },
};
export default getIncidents;
