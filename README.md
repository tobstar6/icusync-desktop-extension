# IcuSync Claude Desktop Extension

This repo contains the Claude Desktop Extension (MCPB) for IcuSync: a thin stdio-to-HTTP proxy (`proxy.js`) that relays MCP requests to the hosted IcuSync MCP server at `https://mcp.icusync.icu/mcp`. The tools and server logic themselves live in IcuSync's main (private) repository; this bundle just connects Claude Desktop to that remote server.

**Website:** https://icusync.icu
**Sign up:** https://icusync.icu/signup
**Docs / more info:** https://icusync.icu/resources

## Build

```bash
zip -r icusync.mcpb manifest.json icon.png proxy.js
```

There's no local server to build; `proxy.js` is a self-contained relay with no dependencies.

## Privacy Policy

IcuSync's privacy policy is available at https://icusync.icu/privacy. It covers what data is collected via this extension (your IcuSync API token and the [intervals.icu](https://intervals.icu) training data it accesses), how it's used and stored, third-party sharing, data retention, and contact information.

## Intervals.icu Integration Status

IcuSync is listed as an approved application in the official [Intervals.icu](https://intervals.icu) app directory, visible to all Intervals.icu users under Settings > Apps. Inclusion in that directory requires compliance with Intervals.icu's API Terms and Conditions and is granted by Intervals.icu's founder, David Tinker, directly. This is not an unofficial wrapper of a third-party API: IcuSync is a sanctioned integration that has been reviewed and approved by the API owner.

## Setup (End User)

**Prerequisites:**
- An active IcuSync subscription (sign up at https://icusync.icu/signup if you don't have one)
- Your [intervals.icu](https://intervals.icu) account connected in the IcuSync dashboard

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

## Available Tools

16 tools total.

**Read:**
- **get_athlete_profile**: Retrieve athlete profile and training zones
- **get_training_history**: Retrieve recent training activities and fitness data
- **get_activity_detail**: Retrieve detailed lap-by-lap data for a specific activity
- **get_events**: Retrieve planned calendar events from the athlete's intervals.icu calendar
- **get_fitness**: Retrieve CTL, ATL and TSB fitness metrics across a date range
- **get_wellness**: Retrieve wellness data including HRV, sleep, resting heart rate and other daily wellness metrics
- **get_best_efforts**: Retrieve best effort times and paces for key distances (400m, 1km, 5km, 10km, half marathon, marathon) from the pace curve
- **get_power_curves**: Get the athlete's best power output curve for a given time period and sport (Ride or Run)
- **get_extended_metrics**: Retrieve advanced sensor metrics for a specific activity including running dynamics, core temperature, DFA alpha1, W' balance and blood glucose
- **get_training_summary**: Aggregate training stats over a date range including total volume, TSS, calories by sport, zone distribution and week-by-week breakdown

**Write:**
- **push_workout**: Push planned workouts to your intervals.icu calendar
- **edit_workout**: Edit an existing workout on your calendar
- **delete_workout**: Delete a workout from your calendar
- **push_wellness**: Write wellness data to intervals.icu: nutrition totals (kcal/macros), subjective scores (fatigue, soreness, mood, motivation, stress), weight, and daily notes
- **update_activity**: Update a completed activity in intervals.icu: name, description, feel, perceived exertion, carbs ingested, gear, tags, and custom activity fields
- **update_sport_settings**: Update an athlete's threshold values (FTP, threshold pace, LTHR, max HR, W') in intervals.icu for Run, Ride, or Swim

## Usage

Once installed, just talk to Claude naturally: no special syntax needed. For example:

- "What's my current fitness (CTL/ATL/TSB)?"
- "Show me my last 5 rides and how they compare to my zones."
- "Push a 60-minute Zone 2 run to my calendar for Saturday."
- "How did I feel after yesterday's workout? Log that I felt strong and add 40g of carbs."
- "Based on my recent power data, does my FTP look accurate?"

Claude calls the IcuSync tools directly: reading training history, fitness metrics, wellness, and power/pace curves, and writing workouts, activity notes, and sport settings back to [intervals.icu](https://intervals.icu), without you needing to know the underlying tool names.

For more details, see https://icusync.icu/resources.
