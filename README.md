# IcuSync Claude Desktop Extension

This folder contains the extension manifest used to build `icusync.mcpb`.

## Build

From the project root:

```bash
bash scripts/build-extension.sh
```

This zips `manifest.json`, `icon.png`, and `proxy.js` into `dist/icusync.mcpb`. `proxy.js` is a thin stdio-to-HTTP relay to the hosted MCP server — there's no local server to build.

## Privacy Policy

IcuSync's privacy policy is available at https://icusync.icu/privacy. It covers what data is collected via this extension (your IcuSync API token and the intervals.icu training data it accesses), how it's used and stored, third-party sharing, data retention, and contact information.

## Setup (End User)

**Prerequisites:**
- An active IcuSync subscription
- Your intervals.icu account connected in the IcuSync dashboard

**Get your API token:**
1. Log in to your IcuSync dashboard: https://icusync.icu/dashboard
2. Go to Account Settings → API Token
3. Copy your token

**Install:**
1. Download `icusync.mcpb`
2. Double-click the file
3. Confirm installation in Claude Desktop
4. Enter your `ICUSYNC_USER_TOKEN` when prompted
5. Restart Claude Desktop

## Usage

Once installed, just talk to Claude naturally — no special syntax needed. For example:

- "What's my current fitness (CTL/ATL/TSB)?"
- "Show me my last 5 rides and how they compare to my zones."
- "Push a 60-minute Zone 2 run to my calendar for Saturday."
- "How did I feel after yesterday's workout? Log that I felt strong and add 40g of carbs."
- "Based on my recent power data, does my FTP look accurate?"

Claude calls the IcuSync tools directly — reading training history, fitness metrics, wellness, and power/pace curves, and writing workouts, activity notes, and sport settings back to intervals.icu — without you needing to know the underlying tool names.
