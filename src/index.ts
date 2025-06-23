import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import cashfreeApiDefinitions from "./tools/cashfree/index.js";
import elasticsearchToolDefinitions from "./tools/elastic-search/index.js";
import { createToolHandler } from "./tools/toolUtils.js";
import fs from "fs";
import path from "path";

const server = new McpServer({
  name: "payment-analytics-mcp",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Register tools
cashfreeApiDefinitions.forEach((tool) => {
  server.tool(
    tool.name,
    tool.description,
    tool.inputSchema.shape,
    createToolHandler(tool),
  );
});
// Register elasticsearch tools
elasticsearchToolDefinitions.forEach((tool) => {
  server.tool(
    tool.name,
    tool.description,
    tool.inputSchema.shape,
    createToolHandler(tool),
  );
});

// Register resources
server.resource(
  "docs://getInternalAnalytics",
  "docs://getInternalAnalytics",
  async () => {
    try {
      const content = fs.readFileSync(
        path.join(process.cwd(), "src/docs/getInternalAnalytics.md"),
        "utf8",
      );
      return {
        contents: [
          {
            uri: "docs://getInternalAnalytics",
            text: content,
            mimeType: "text/markdown",
          },
        ],
      };
    } catch (error) {
      return {
        contents: [
          {
            uri: "docs://getInternalAnalytics",
            text: "Documentation not found",
            mimeType: "text/markdown",
          },
        ],
      };
    }
  },
);

server.resource(
  "docs://getTopPaymentErrors",
  "docs://getTopPaymentErrors",
  async () => {
    const content = fs.readFileSync(
      path.join(process.cwd(), "src/docs/getTopPaymentErrors.md"),
      "utf8",
    );
    return {
      contents: [
        {
          uri: "docs://getTopPaymentErrors",
          text: content,
          mimeType: "text/markdown",
        },
      ],
    };
  },
);


async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("✅ Payment Analytics MCP Server is running.");
  console.error("🛠 Tools:");
  cashfreeApiDefinitions.forEach((t) => console.error(` - ${t.name}`));
  elasticsearchToolDefinitions.forEach((t) => console.error(` - ${t.name}`));
  console.error("📚 Resources:");
  console.error(" - docs://getInternalAnalytics");
  console.error(" - docs://getTopPaymentErrors");
}

main().catch((err) => {
  console.error("❌ MCP startup error:", err);
  process.exit(1);
});
