# Polymarket Agent Hub

A complete solution for building AI agents that interact with Polymarket prediction markets. 
This repository contains both a web application for connecting and testing the MCP server, 
and a fully functional MCP (Model Context Protocol) server.

## What's Inside

This repository provides two main components:

1. **Polymarket Agent Hub (Frontend)** - A modern Next.js 14 web application that allows users to connect to and test the MCP server
2. **PolyMarket MCP Server (Backend)** - A production-ready Python MCP server that provides AI agents with access to Polymarket prediction market data

## Quick Start

### For the Web Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Visit `http://localhost:3000` to access the web application where you can connect to and test the MCP server.

### For the MCP Server

```bash
# Clone the repository
git clone https://github.com/polysolmcp/polysolmcp.git
cd polysolmcp

# Install Python dependencies
uv pip install -e .

# Create .env file with your credentials
echo "KEY=your_polymarket_api_key_here" > .env
echo "FUNDER=your_polymarket_wallet_address" >> .env

# Run the server
uv run src/polymarket_mcp/server.py
```

---

## Part 1: Polymarket Agent Hub (Frontend)

### Overview

The Polymarket Agent Hub is a web application built with Next.js 14, TypeScript, and Tailwind CSS. It provides:

- Interactive interface for connecting to and testing the MCP server
- Clear explanations of what the MCP server does
- Step-by-step installation and configuration instructions
- Code examples and configuration snippets
- Agent blueprint ideas for inspiration
- Frequently asked questions

### Technology Stack

- **Next.js 14** - Modern React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with dark theme

### Development

```bash
npm install          # Install dependencies
npm run dev         # Start development server (http://localhost:3000)
npm run build       # Build for production
npm start           # Run production server
```

---

## Part 2: MCP Server (Backend)

### What is an MCP Server?

The Model Context Protocol (MCP) is a standardized way for AI agents to interact with external data sources. 
MCP servers act as bridges between AI clients (like Claude Desktop) and external APIs or services.
This MCP server specifically connects AI agents to Polymarket's prediction markets.

### Features

- ✅ **Real-time Market Data** - Get current prices and probabilities for any market
- ✅ **Market Discovery** - List and filter markets by status, category, and more
- ✅ **Historical Analysis** - Access price and volume history with customizable timeframes
- ✅ **Error Handling** - Robust error handling for API failures and rate limits
- ✅ **Clean Data Format** - Responses formatted for easy consumption by AI agents

### Installation Methods

#### Option 1: Install via Smithery (Recommended)

The easiest way to install for Claude Desktop:

```bash
npx -y @smithery/cli install polymarket_mcp --client claude
```

#### Option 2: Manual Installation

1. **Clone and install dependencies:**

```bash
git clone https://github.com/polysolmcp/polysolmcp.git
cd polysolmcp
uv pip install -e .
```

2. **Set up environment variables:**

Create a `.env` file in the project root:

```env
KEY=your_polymarket_api_key_here
FUNDER=your_polymarket_wallet_address
```

**How to get your credentials:**
- **KEY**: Export your private key from the Polymarket UI (Settings → API Keys)
- **FUNDER**: Your Polymarket wallet address (found in your account settings)

3. **Configure Claude Desktop:**

Edit your Claude Desktop configuration file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

Add this configuration:

```json
{
    "mcpServers": {
        "polymarket-mcp": {
            "command": "uv",
            "args": [
                "--directory",
                "/path/to/polysolmcp",
                "run",
                "src/polymarket_mcp/server.py"
            ],
            "env": {
                "KEY": "your_polymarket_api_key",
                "FUNDER": "your_polymarket_wallet_address"
            }
        }
    }
}
```

**Important:** Replace `/path/to/polysolmcp` with the actual path to your cloned repository.

4. **Run the server:**

```bash
# Standard run
uv run src/polymarket_mcp/server.py

# With MCP Inspector (for debugging)
npx @modelcontextprotocol/inspector uv --directory /path/to/polysolmcp run src/polymarket_mcp/server.py
```

---

## Available MCP Tools

The server provides four main tools that AI agents can use:

### 1. `get-market-info`

Get detailed information about a specific prediction market.

**Input:**
```json
{
    "market_id": "0x1234..." // Market ID or slug
}
```

**Returns:** Market title, category, status, resolution date, volume, liquidity, and description.

### 2. `list-markets`

List available prediction markets with filtering and pagination.

**Input:**
```json
{
    "status": "active",     // Optional: "active" or "resolved"
    "limit": 10,            // Optional: Number of results (1-100, default: 10)
    "offset": 0             // Optional: Pagination offset (default: 0)
}
```

**Returns:** List of markets with IDs, titles, status, categories, and volume.

### 3. `get-market-prices`

Get current prices and trading information for a market.

**Input:**
```json
{
    "market_id": "0x1234..." // Market ID or slug
}
```

**Returns:** Current prices and implied probabilities for each outcome.

### 4. `get-market-history`

Get historical price and volume data for a market.

**Input:**
```json
{
    "market_id": "0x1234...",  // Market ID or slug
    "timeframe": "7d"          // Optional: "1d", "7d", "30d", or "all" (default: "7d")
}
```

**Returns:** Time series data suitable for charts and backtesting.

---

## Error Handling

The server handles various error scenarios gracefully:

- **Rate Limiting (429)** - Automatic retry logic
- **Invalid API Keys (403)** - Clear error messages
- **Invalid Market IDs (404)** - Helpful error responses
- **Network Issues** - Timeout handling (30 seconds)
- **Malformed Responses** - Safe error recovery

All errors are returned in a clear, human-readable format that AI agents can understand and communicate to users.

---

## Prerequisites

### For Frontend Development
- Node.js 18 or higher
- npm, yarn, or pnpm

### For MCP Server
- Python 3.10 or higher
- `uv` package manager (recommended) or `pip`
- Required Python packages:
  - `mcp>=0.1.0`
  - `httpx>=0.24.0`
  - `python-dotenv>=1.0.0`
  - `py-clob-client`

All dependencies are automatically installed when you run `uv pip install -e .`

---

## Project Structure

```
polysolmcp/
├── src/
│   ├── app/                    # Next.js frontend application
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main landing page with all sections
│   │   └── globals.css         # Global styles and Tailwind imports
│   └── polymarket_mcp/         # MCP server Python package
│       ├── __init__.py         # Package initialization
│       └── server.py           # Main MCP server implementation
├── package.json                 # Node.js dependencies and scripts
├── pyproject.toml              # Python package configuration
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── Dockerfile                  # Docker configuration for MCP server
├── smithery.yaml               # Smithery installation configuration
├── LICENSE                     # MIT License
└── README.md                   # This file
```

---

## Use Cases

This MCP server enables AI agents to:

- **Monitor Markets** - Track specific prediction markets for changes
- **Analyze Trends** - Study historical price movements and patterns
- **Discover Opportunities** - Find high-volume or interesting markets
- **Build Trading Bots** - Create automated agents that make decisions based on market data
- **Research** - Gather data for analysis and reporting

---

## Troubleshooting

### Server won't start
- Check that your `.env` file exists and contains valid `KEY` and `FUNDER` values
- Verify Python 3.10+ is installed: `python --version`
- Ensure dependencies are installed: `uv pip install -e .`

### Claude Desktop can't connect
- Verify the path in `claude_desktop_config.json` is correct
- Check that environment variables are set in the config file
- Restart Claude Desktop after making configuration changes

### API errors
- Verify your API key is valid and has proper permissions
- Check that your wallet address (FUNDER) is correct
- Ensure you're not hitting rate limits

---

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit with clear messages (`git commit -m 'Add amazing feature'`)
5. Push to your branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

For major changes, please open an issue first to discuss what you'd like to change.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support

- **GitHub Issues**: Report bugs or request features
- **Web Application**: Visit the application at `http://localhost:3000` when running locally to connect and test the MCP server
- **MCP Protocol**: Learn more about MCP at [modelcontextprotocol.io](https://modelcontextprotocol.io)

---

**Note:** This project is not affiliated with Polymarket. Use at your own risk. Always verify API responses and handle errors appropriately in production environments.
