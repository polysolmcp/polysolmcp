# Polymarket Agent Hub

A landing and documentation site for the open-source polymarket-mcp MCP server, combined with the MCP server implementation itself.

## Overview

This repository contains:

1. **Polymarket Agent Hub** - A Next.js 14 landing and documentation site that serves as the front door for developers building AI agents with polymarket-mcp
2. **PolyMarket MCP Server** - A Model Context Protocol (MCP) server that provides access to prediction market data through the PolyMarket API

[![smithery badge](https://smithery.ai/badge/polymarket_mcp)](https://smithery.ai/server/polymarket_mcp)

<a href="https://glama.ai/mcp/servers/c255m147fd">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/c255m147fd/badge" alt="PolyMarket Server MCP server" />
</a>


---

## Part 1: Polymarket Agent Hub (Frontend)

### Purpose

The Polymarket Agent Hub is a static frontend application that serves as documentation and onboarding for developers who want to build AI agents using the polymarket-mcp MCP server. It does not contain or run the MCP server itself, nor does it interact with Polymarket APIs.

### Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with dark theme

### Getting Started (Frontend)

#### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

#### Installation

```bash
npm install
```

#### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

#### Production Build

Build the production bundle:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## Part 2: PolyMarket MCP Server (Backend)

### Features

- Real-time prediction market data with current prices and probabilities
- Detailed market information including categories, resolution dates, and descriptions
- Historical price and volume data with customizable timeframes (1d, 7d, 30d, all)
- Built-in error handling and rate limit management
- Clean data formatting for easy consumption

### Installation

#### Installing via Smithery

To install PolyMarket Predictions for Claude Desktop automatically via [Smithery](https://smithery.ai/server/polymarket_mcp):

```bash
npx -y @smithery/cli install polymarket_mcp --client claude
```

#### Claude Desktop Configuration

- On macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

<details>
<summary>Development/Unpublished Servers Configuration</summary>

```json
{
    "mcpServers": {
        "polymarket-mcp": {
            "command": "uv",
            "args": [
                "--directory",
                "/Users/{INSERT_USER}/YOUR/PATH/TO/polysolmcp",
                "run",
                "src/polymarket_mcp/server.py"
            ],
            "env": {
                "KEY": "<insert poly market api key>",
                "FUNDER": "<insert polymarket wallet address>"
            }
        }
    }
}
```

</details>

### Running Locally

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/polysolmcp/polysolmcp.git
cd polysolmcp
```

#### Install Libraries

```bash
uv pip install -e .
```

2. Create a `.env` file with your PolyMarket API key:

```
KEY=your_api_key_here
FUNDER=your_polymarket_wallet_address
```

### Running the Server

After connecting Claude client with the MCP tool via json file and installing the packages, Claude should see the server's mcp tools:

You can run the server yourself via:

```bash
uv run src/polymarket_mcp/server.py
```

If you want to run the server inspector along with the server:

```bash
npx @modelcontextprotocol/inspector uv --directory C:\\Users\\{INSERT_USER}\\YOUR\\PATH\\TO\\polysolmcp run src/polymarket_mcp/server.py
```

## Available Tools

The server implements four tools:

- `get-market-info`: Get detailed information about a specific prediction market
- `list-markets`: List available prediction markets with filtering options
- `get-market-prices`: Get current prices and trading information
- `get-market-history`: Get historical price and volume data

### get-market-info

**Input Schema:**
```json
{
    "market_id": {
        "type": "string",
        "description": "Market ID or slug"
    }
}
```

**Example Response:**
```
Title: Example Market
Category: Politics
Status: Open
Resolution Date: 2024-12-31
Volume: $1,234,567.89
Liquidity: $98,765.43
Description: This is an example prediction market...
---
```

### list-markets

**Input Schema:**
```json
{
    "status": {
        "type": "string",
        "description": "Filter by market status",
        "enum": ["open", "closed", "resolved"]
    },
    "limit": {
        "type": "integer",
        "description": "Number of markets to return",
        "default": 10,
        "minimum": 1,
        "maximum": 100
    },
    "offset": {
        "type": "integer",
        "description": "Number of markets to skip (for pagination)",
        "default": 0,
        "minimum": 0
    }
}
```

**Example Response:**
```
Available Markets:

ID: market-123
Title: US Presidential Election 2024
Status: Open
Volume: $1,234,567.89
---

ID: market-124
Title: Oscar Best Picture 2024
Status: Open
Volume: $234,567.89
---
```

### get-market-prices

**Input Schema:**
```json
{
    "market_id": {
        "type": "string",
        "description": "Market ID or slug"
    }
}
```

**Example Response:**
```
Current Market Prices for US Presidential Election 2024

Outcome: Democratic
Price: $0.6500
Probability: 65.0%
---

Outcome: Republican
Price: $0.3500
Probability: 35.0%
---
```

### get-market-history

**Input Schema:**
```json
{
    "market_id": {
        "type": "string",
        "description": "Market ID or slug"
    },
    "timeframe": {
        "type": "string",
        "description": "Time period for historical data",
        "enum": ["1d", "7d", "30d", "all"],
        "default": "7d"
    }
}
```

**Example Response:**
```
Historical Data for US Presidential Election 2024
Time Period: 7d

Time: 2024-01-20T12:00:00Z
Price: $0.6500
Volume: $123,456.78
---

Time: 2024-01-19T12:00:00Z
Price: $0.6300
Volume: $98,765.43
---
```

## Error Handling

The server includes comprehensive error handling for various scenarios:

- Rate limiting (429 errors)
- Invalid API keys (403 errors)
- Invalid market IDs (404 errors)
- Network connectivity issues
- API timeout conditions (30-second timeout)
- Malformed responses

Error messages are returned in a clear, human-readable format.

## Prerequisites

### For Frontend (Next.js)
- Node.js 18+ and npm (or yarn/pnpm)

### For Backend (MCP Server)
- Python 3.10 or higher
- httpx>=0.24.0
- mcp-core
- python-dotenv>=1.0.0
- py-clob-client

## Project Structure

```
polymarket-agent-hub/
├── src/
│   ├── app/                    # Next.js frontend application
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main landing page
│   │   └── globals.css         # Global styles and Tailwind imports
│   └── polymarket_mcp/         # MCP server Python package
│       ├── __init__.py
│       └── server.py           # Main MCP server implementation
├── package.json                 # Node.js dependencies
├── pyproject.toml              # Python package configuration
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── Dockerfile                  # Docker configuration for MCP server
├── smithery.yaml               # Smithery configuration
├── LICENSE                     # MIT License
└── README.md                   # This file
```

## Notes

- The frontend is purely for documentation and onboarding to polymarket-mcp
- Users should refer to this README for up-to-date environment details and installation instructions
- The MCP server must be installed and run separately from the frontend
- This repository combines both the documentation site and the MCP server implementation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT License - see LICENSE file for details.
