---
title: ""MCP Connectors: The USB-C of AI""
description: How Model Context Protocol standardizes AI tool connections and why it matters
---

# MCP Connectors: The USB-C of AI

Before USB-C, every device had its own connector. Lightning, Micro-USB, USB-A, HDMI, DisplayPort — a mess of incompatible standards. USB-C unified them all.

AI tools face the same problem. Every AI framework has its own way of connecting to external tools, data sources, and services. LangChain has its tool format. Claude has its function calling. OpenAI has its own. Each requires custom integration.

The Model Context Protocol (MCP) is the USB-C of AI — a standard way for AI models to connect to external tools and data sources. Once you build an MCP connector, any MCP-compatible AI can use it.

This chapter teaches you to build and use MCP connectors.

## What Is MCP?

MCP is an open protocol that standardizes how AI applications connect to external data sources and tools. It defines:

- **How tools are described** (name, description, input schema)
- **How tools are called** (request/response format)
- **How resources are exposed** (data that AI can read)
- **How prompts are templated** (reusable prompt patterns)

The key insight: MCP decouples AI models from tools. Build a connector once, use it with any MCP-compatible AI.

## MCP Architecture

```
┌──────────────────────────────────────────────┐
│              AI Application                   │
│         (Claude, GPT, Local LLM)              │
│                    │                          │
│              MCP Client                       │
└────────────────────┼──────────────────────────┘
                     │
              MCP Protocol
                     │
┌────────────────────┼──────────────────────────┐
│              MCP Server                        │
│                    │                          │
│    ┌───────────────┼───────────────┐          │
│    │   Tools       │  Resources    │          │
│    │  (Actions)    │   (Data)      │          │
│    └───────────────┼───────────────┘          │
│                    │                          │
│    ┌───────────────┼───────────────┐          │
│    │  Database     │  File System  │          │
│    │  API          │  Web Service  │          │
│    └───────────────────────────────┘          │
└──────────────────────────────────────────────┘
```

## Building an MCP Server

### Python MCP Server

```python
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent
from pydantic import BaseModel

app = Server("weather-server")

class WeatherInput(BaseModel):
    location: str
    units: str = "celsius"

@app.tool()
async def get_weather(location: str, units: str = "celsius") -> list[TextContent]:
    """Get current weather for a location."""
    # Fetch weather data
    data = await fetch_weather(location, units)
    return [TextContent(type="text", text=f"Weather in {location}: {data}")]

@app.resource("weather://schema")
async def weather_schema() -> list[TextContent]:
    """Weather data schema."""
    return [TextContent(type="text", text=json.dumps(WEATHER_SCHEMA))]

async def main():
    async with stdio_server() as (read_stream, write_stream):
        await app.run(read_stream, write_stream)

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
```

### TypeScript MCP Server

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "database-connector",
  version: "1.0.0",
});

// Define a tool
server.tool(
  "query_database",
  "Execute a read-only SQL query",
  {
    sql: z.string().describe("The SQL query (SELECT only)"),
    params: z.record(z.any()).optional().describe("Query parameters"),
  },
  async ({ sql, params }) => {
    // Validate: only SELECT
    if (!sql.trim().toUpperCase().startsWith("SELECT")) {
      return {
        content: [{ type: "text", text: "Error: Only SELECT queries allowed" }],
        isError: true,
      };
    }
    
    const results = await db.query(sql, params);
    return {
      content: [{ type: "text", text: JSON.stringify(results.rows) }],
    };
  }
);

// Define a resource
server.resource(
  "database_schema",
  "schema://tables",
  async () => ({
    contents: [{
      uri: "schema://tables",
      text: JSON.stringify(await getSchema()),
    }],
  })
);

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

## MCP Tool Types

### 1. Action Tools

Tools that perform actions and return results.

```python
@app.tool()
async def send_email(
    to: str,
    subject: str,
    body: str
) -> list[TextContent]:
    """Send an email to a recipient."""
    result = await email_service.send(to, subject, body)
    return [TextContent(type="text", text=f"Email sent: {result.message_id}")]
```

### 2. Data Resources

Resources that expose data for the AI to read.

```python
@app.resource("docs://{path}")
async def documentation(path: str) -> list[TextContent]:
    """Access project documentation."""
    content = await docs_store.get(path)
    return [TextContent(type="text", text=content)]
```

### 3. Prompt Templates

Reusable prompt patterns that the AI can fill in.

```python
@app.prompt()
async def code_review(
    code: str,
    focus: str = "general"
) -> list[TextContent]:
    """Review code with a specific focus."""
    return [TextContent(
        type="text",
        text=f"Review the following code focusing on {focus}:\n\n```{code}```"
    )]
```

## Connecting MCP to AI Applications

### Claude Desktop

```json
// claude_desktop_config.json
{
  "mcpServers": {
    "weather": {
      "command": "python",
      "args": ["/path/to/weather_server.py"]
    },
    "database": {
      "command": "node",
      "args": ["/path/to/database_server.js"]
    }
  }
}
```

### Custom AI Application

```python
from mcp.client import ClientSession
from mcp.client.stdio import stdio_client

async def use_mcp_tool():
    async with stdio_client("python", ["weather_server.py"]) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            
            # List available tools
            tools = await session.list_tools()
            
            # Call a tool
            result = await session.call_tool(
                "get_weather",
                {"location": "London", "units": "celsius"}
            )
            return result
```

## Security Considerations

### Tool Authorization

Not all users should have access to all tools. Implement authorization at the MCP server level:

```python
@app.tool()
async def delete_record(
    record_id: str,
    context: RequestContext
) -> list[TextContent]:
    """Delete a record by ID."""
    user = context.user
    if not user.has_permission("delete"):
        return [TextContent(type="text", text="Error: Permission denied")]
    
    await db.delete(record_id)
    return [TextContent(type="text", text=f"Record {record_id} deleted")]
```

### Input Validation

Always validate tool inputs, even though the AI is calling the tool:

```python
@app.tool()
async def execute_query(
    sql: str,
    context: RequestContext
) -> list[TextContent]:
    """Execute a database query."""
    # Validate: only SELECT
    if not sql.strip().upper().startswith("SELECT"):
        return [TextContent(type="text", text="Error: Only SELECT allowed")]
    
    # Validate: no destructive patterns
    dangerous_patterns = ["DROP", "DELETE", "UPDATE", "INSERT", "ALTER"]
    if any(p in sql.upper() for p in dangerous_patterns):
        return [TextContent(type="text", text="Error: Destructive operations not allowed")]
    
    results = await db.query(sql)
    return [TextContent(type="text", text=json.dumps(results))]
```

### Rate Limiting

Implement rate limiting to prevent abuse:

```python
from collections import defaultdict
import time

rate_limits = defaultdict(list)

def check_rate_limit(user_id: str, max_calls: int = 100, window: int = 60):
    now = time.time()
    calls = rate_limits[user_id]
    # Remove old calls
    calls = [t for t in calls if now - t < window]
    rate_limits[user_id] = calls
    
    if len(calls) >= max_calls:
        return False
    calls.append(now)
    return True
```

## Building a Connector Ecosystem

### Common Connectors to Build

1. **Database connectors:** PostgreSQL, MySQL, MongoDB
2. **API connectors:** REST APIs, GraphQL endpoints
3. **File system connectors:** Local files, S3, Google Drive
4. **Communication connectors:** Email, Slack, Discord
5. **Data source connectors:** Web scraping, RSS feeds, news APIs

### Connector Registry

Maintain a registry of available connectors:

```yaml
connectors:
  - name: postgresql
    description: "Connect to PostgreSQL databases"
    type: database
    server: "postgresql-mcp-server"
    config:
      - DATABASE_URL
    
  - name: slack
    description: "Send and receive Slack messages"
    type: communication
    server: "slack-mcp-server"
    config:
      - SLACK_BOT_TOKEN
      - SLACK_CHANNEL
```

## End-of-Chapter Checklist

- [ ] I understand what MCP is and why it's the standard for AI tool connections
- [ ] I can build MCP servers in Python and TypeScript
- [ ] I know the three MCP types: action tools, data resources, and prompt templates
- [ ] I can connect MCP servers to AI applications (Claude Desktop, custom apps)
- [ ] I implement security controls: authorization, input validation, rate limiting
- [ ] I understand the common connector types to build for my ecosystem

## What's Next

MCP connectors give AI access to tools and data. But AI also needs access to your knowledge base. The next chapter covers RAG systems — retrieval-augmented generation in production.

**Next:** [RAG Systems: Retrieval-Augmented Generation in Production](./rag-systems)
