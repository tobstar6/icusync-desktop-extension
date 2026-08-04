# IcuSync Claude Desktop Extension

This repo contains the Claude Desktop Extension (MCPB) for IcuSync — a thin stdio-to-HTTP proxy (`proxy.js`) that relays MCP requests to the hosted IcuSync MCP server at `https://mcp.icusync.icu/mcp`. The actual tools and server logic live in IcuSync's main (private) repository; this bundle just connects Claude Desktop to that remote server.

## Build

```bash
zip -r icusync.mcpb manifest.json icon.png proxy.js
```

## Privacy Policy

IcuSync's privacy policy is available at https://icusync.icu/privacy. It covers what data is collected via this extension (your IcuSync API token and the intervals.icu training data it accesses), how it's used and stored, third-party sharing, data retention, and contact information.

## Install (End User)

1. Download `icusync.mcpb`
2. Double-click the file
3. Confirm installation in Claude Desktop
4. Enter:
   - `ICUSYNC_USER_TOKEN` (same token used for MCP URL)
5. Restart Claude Desktop
