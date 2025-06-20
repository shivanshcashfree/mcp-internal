import { z } from "zod";
import { ApiToolConfig } from "./types.js";

// Response schema for backoff tool
export const backoffResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  waitTime: z.number(),
  remainingTokens: z.number().optional(),
  maxTokens: z.number().optional(),
});

const backoff: ApiToolConfig = {
  name: "backoff",
  description: "Back off for a specified time to avoid hitting rate limits. Checks API rate limit status and waits if necessary to prevent throttling.",
  apiEndpoint: "/v1/responses", // This will be appended to a different base URL
  inputSchema: z.object({
    model: z.string().optional().default("gpt-4.1").describe("Model to check rate limits for"),
    waitTimeSeconds: z.number().optional().default(40).describe("Time to wait in seconds if rate limit is low"),
    thresholdPercentage: z.number().optional().default(50).describe("Rate limit threshold percentage below which to wait"),
  }),
  method: "POST",
  payloadMapper: (args) => ({
    model: args.model || "gpt-4.1",
    input: "Hello OpenAI",
  }),
  responseFormatter: (data) => {
    const response = {
      success: true,
      message: "Backoff completed successfully",
      waitTime: data.waitTime || 0,
      remainingTokens: data.remainingTokens,
      maxTokens: data.maxTokens,
    };
    return backoffResponseSchema.parse(response);
  },
};

export default backoff;