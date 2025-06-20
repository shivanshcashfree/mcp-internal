// src/lib/apiClient.ts
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Makes an API call with retry logic for tools that return empty data when DB queries are still processing.
 * @param baseUrl The base URL of the external API.
 * @param endpoint The specific path for the external API.
 * @param payload The JSON payload to send in the request body.
 * @param method The HTTP method to use for the request.
 * @param maxRetries Maximum number of retries (default 3).
 * @param backoffSeconds Seconds to wait between retries (default 5).
 * @returns The JSON response from the API, or null if an error occurs.
 */
export async function makeApiCallWithRetry(
  baseUrl: string,
  endpoint: string,
  payload: Record<string, any>,
  method: "POST" | "GET" = "POST",
  maxRetries: number = 3,
  backoffSeconds: number = 5,
): Promise<any | null> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const response = await makeApiCall(baseUrl, endpoint, payload, method);
    
    if (response === null) {
      return null; // API call failed completely
    }
    
    // Check if this is an empty data response that might need retry
    const isEmptyDataResponse = 
      (response.status === true && Array.isArray(response.data) && response.data.length === 0) ||
      (response.success === true && Array.isArray(response.message) && response.message.length === 0);
    
    // If it's not an empty data response, or we're on the last attempt, return the response
    if (!isEmptyDataResponse || attempt === maxRetries) {
      return response;
    }
    
    // Log retry attempt
    console.error(`[API Client] Empty data response on attempt ${attempt}/${maxRetries}. Retrying in ${backoffSeconds} seconds...`);
    
    // Wait before retrying
    await new Promise(resolve => setTimeout(resolve, backoffSeconds * 1000));
  }
  
  return null;
}

export async function makeApiCall(
  baseUrl: string,
  endpoint: string,
  data: any,
  method: "GET" | "POST" = "POST"
): Promise<any> {
  const url = `${baseUrl}${endpoint}`;
  
  // Determine headers based on the base URL
  let headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add OpenAI API key if calling OpenAI API
  if (baseUrl.includes('api.openai.com')) {
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }
    headers.Authorization = `Bearer ${openaiApiKey}`;
  }

  console.error(`\n--- API Call Details ---`);
  console.error(`[API Client] Calling API: ${url}`);
  console.error(`[API Client] Method: ${method}`);
  console.error(`[API Client] Headers:`);
  console.error(`    Content-Type: application/json`);
  if (method !== "GET") {
    console.error(`[API Client] Request Body:\n${JSON.stringify(data, null, 2)}`);
  }
  console.error(`------------------------\n`);

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: method === "POST" ? JSON.stringify(data) : undefined,
    });

    const responseText = await response.text();
    console.error(`\n--- API Response Details ---`);
    console.error(
      `[API Client] Response Status: ${response.status} ${response.statusText}`,
    );
    console.error(`[API Client] Raw Response Body:\n${responseText}`);
    console.error(`---------------------------\n`);

    if (!response.ok) {
      console.error(
        `[API Client] API call failed: ${response.status} - ${responseText}`,
      );
      throw new Error(`API error ${response.status}: ${responseText}`);
    }

    try {
      const jsonResponse = JSON.parse(responseText);
      console.error(`[API Client] Successfully parsed JSON response.`);
      return jsonResponse;
    } catch (parseError) {
      console.error(`[API Client] Error parsing JSON response:`, parseError);
      console.error(`[API Client] Raw response was: ${responseText}`);
      throw new Error(`Failed to parse JSON response: ${responseText}`);
    }
  } catch (err) {
    console.error(
      `[API Client] Fatal error during API call to ${url}:`,
      err,
    );
    return null;
  }
}
