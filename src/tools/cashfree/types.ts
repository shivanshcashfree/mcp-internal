import { ZodObject } from "zod";

export interface ApiToolConfig<TArgs extends object = any> {
  name: string;
  description: string;
  apiEndpoint: string;
  inputSchema: ZodObject<any>;
  payloadMapper: (args: TArgs) => Record<string, any>;
  responseFormatter: (data: any) => string | object;
  method?: "GET" | "POST";
  resources?: string[];
  enableRetry?: boolean;
  maxRetries?: number;
  backoffSeconds?: number;
  baseUrl?: string; 
}
