export const BEARER_TOKEN = process.env.BEARER_TOKEN;

// Validate that the bearer token is provided
if (!BEARER_TOKEN) {
  throw new Error(
    "BEARER_TOKEN environment variable is required but not provided",
  );
}
export const CASHFREE_API_BASE_URL = "https://internal.prodint.cashfree.com";
