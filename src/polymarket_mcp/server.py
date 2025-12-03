"""
PolyMarket MCP Server

A Model Context Protocol (MCP) server that provides AI agents with access to
Polymarket prediction market data through a standardized interface.

This server implements four main tools:
- get-market-info: Retrieve detailed information about a specific market
- list-markets: List available markets with filtering and pagination
- get-market-prices: Get current prices and probabilities for a market
- get-market-history: Access historical price and volume data
"""

from typing import Any
import asyncio
import httpx
import json
from mcp.server.models import InitializationOptions
import mcp.types as types
from mcp.server import NotificationOptions, Server
import mcp.server.stdio
import os
from dotenv import load_dotenv
from py_clob_client.client import ClobClient
from py_clob_client.clob_types import OrderArgs
from py_clob_client.constants import POLYGON

# Load environment variables from .env file
# This allows the server to access API keys and wallet addresses securely
load_dotenv()

# Initialize the MCP server with a unique name
# This name is used to identify the server in MCP client configurations
server = Server("polymarket_predictions")


# The CLOB (Central Limit Order Book) client handles all communication
# with Polymarket's API, including authentication and market data retrieval.
def get_clob_client() -> ClobClient:
    """
    Initialize and return a ClobClient instance for interacting with Polymarket's API.
    
    The client is configured using environment variables:
    - CLOB_HOST: The Polymarket API endpoint (defaults to production)
    - KEY: Private key exported from Polymarket UI
    - FUNDER: Wallet address from Polymarket account
    
    Returns:
        ClobClient: Configured client ready to make API calls
    """
    # Get API endpoint, defaulting to production if not specified
    host = os.getenv("CLOB_HOST", "https://clob.polymarket.com")
    
    # Get credentials from environment variables
    key = os.getenv("KEY")  # Private key exported from polymarket UI
    funder = os.getenv("FUNDER")  # Funder address from polymarket UI
    chain_id = POLYGON  # Polymarket uses Polygon blockchain
    
    # Create and configure the client
    client = ClobClient(
        host,
        key=key,
        chain_id=POLYGON,
        funder=funder,
        signature_type=1,  # EIP-712 signature type
    )
    
    # Set API credentials (creates or derives them if needed)
    client.set_api_creds(client.create_or_derive_api_creds())
    
    return client


@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    """
    Register all available MCP tools with the server.
    
    This function is called by the MCP framework to discover what tools
    are available. Each tool defines its input schema using JSON Schema,
    which allows AI agents to understand what parameters are required.
    
    Returns:
        list[types.Tool]: List of all available tools with their schemas
    """
    return [
        types.Tool(
            name="get-market-info",
            description="Get detailed information about a specific prediction market",
            inputSchema={
                "type": "object",
                "properties": {
                    "market_id": {
                        "type": "string",
                        "description": "Market ID or slug",
                    },
                },
                "required": ["market_id"],
            },
        ),
        types.Tool(
            name="list-markets",
            description="Get a list of prediction markets with optional filters",
            inputSchema={
                "type": "object",
                "properties": {
                    "status": {
                        "type": "string",
                        "description": "Filter by market status (e.g., open, closed, resolved)",
                        "enum": ["active", "resolved"],
                    },
                    "limit": {
                        "type": "integer",
                        "description": "Number of markets to return (default: 10)",
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
                },
            },
        ),
        types.Tool(
            name="get-market-prices",
            description="Get current prices and trading information for a market",
            inputSchema={
                "type": "object",
                "properties": {
                    "market_id": {
                        "type": "string",
                        "description": "Market ID or slug",
                    },
                },
                "required": ["market_id"],
            },
        ),
        types.Tool(
            name="get-market-history",
            description="Get historical price and volume data for a market",
            inputSchema={
                "type": "object",
                "properties": {
                    "market_id": {
                        "type": "string",
                        "description": "Market ID or slug",
                    },
                    "timeframe": {
                        "type": "string",
                        "description": "Time period for historical data",
                        "enum": ["1d", "7d", "30d", "all"],
                        "default": "7d"
                    }
                },
                "required": ["market_id"],
            },
        )
    ]


def format_market_info(market_data: dict) -> str:
    """
    Format raw market data into a human-readable string.
    
    This function takes the raw API response and formats it into a
    structured text format that's easy for AI agents to parse and
    communicate to users.
    
    Args:
        market_data: Dictionary containing market information from API
        
    Returns:
        str: Formatted string with market details, or error message
    """
    try:
        # Validate input
        if not market_data or not isinstance(market_data, dict):
            return "No market information available"
        
        # Extract key fields with safe defaults
        condition_id = market_data.get('condition_id', 'N/A')
        title = market_data.get('title', 'N/A')
        status = market_data.get('status', 'N/A')
        resolution_date = market_data.get('resolution_date', 'N/A')
        
        # Format as structured text
        return (
            f"Condition ID: {condition_id}\n"
            f"Title: {title}\n"
            f"Status: {status}\n"
            f"Resolution Date: {resolution_date}\n"
            "---"
        )
    except Exception as e:
        return f"Error formatting market data: {str(e)}"


def format_market_list(markets_data: list) -> str:
    """
    Format a list of markets into a readable string format.
    
    Processes multiple markets and formats each one with all available
    information, including volume formatting for better readability.
    
    Args:
        markets_data: List of market dictionaries from API
        
    Returns:
        str: Formatted string with all market information
    """
    try:
        # Handle empty results
        if not markets_data:
            return "No markets available"
        
        # Start building the formatted output
        formatted_markets = ["Available Markets:\n"]
        
        # Process each market in the list
        for market in markets_data:
            try:
                # Format volume as currency (handle both string and numeric)
                volume = float(market.get('volume', 0))
                volume_str = f"${volume:,.2f}"
            except (ValueError, TypeError):
                # Fallback if volume can't be converted to float
                volume_str = f"${market.get('volume', 0)}"
            
            # Build formatted entry for this market
            formatted_markets.append(
                f"Condition ID: {market.get('condition_id', 'N/A')}\n"
                f"Description: {market.get('description', 'N/A')}\n"
                f"Category: {market.get('category', 'N/A')}\n"
                f"Tokens: {market.get('question', 'N/A')}\n"
                f"Question: {market.get('active', 'N/A')}\n"
                f"Rewards: {market.get('rewards', 'N/A')}\n"
                f"Active: {market.get('active', 'N/A')}\n"
                f"Closed: {market.get('closed', 'N/A')}\n"
                f"Slug: {market.get('market_slug', 'N/A')}\n"
                f"Min Incentive size: {market.get('min_incentive_size', 'N/A')}\n"
                f"Max Incentive size: {market.get('max_incentive_spread', 'N/A')}\n"
                f"End date: {market.get('end_date_iso', 'N/A')}\n"
                f"Start time: {market.get('game_start_time', 'N/A')}\n"
                f"Min order size: {market.get('minimum_order_size', 'N/A')}\n"
                f"Max tick size: {market.get('minimum_tick_size', 'N/A')}\n"
                f"Volume: {volume_str}\n"
                "---\n"
            )
        
        # Join all formatted markets into a single string
        return "\n".join(formatted_markets)
    except Exception as e:
        return f"Error formatting markets list: {str(e)}"


def format_market_prices(market_data: dict) -> str:
    """
    Format market price data into a readable string.
    
    Extracts current price information from the market data and formats
    it for display. Note: The exact structure may vary based on the
    CLOB client's response format.
    
    Args:
        market_data: Dictionary containing market price information
        
    Returns:
        str: Formatted price information or original data if formatting fails
    """
    try:
        # Validate input
        if not market_data or not isinstance(market_data, dict):
            return market_data
        
        # Start building formatted output
        formatted_prices = [
            f"Current Market Prices for {market_data.get('title', 'Unknown Market')}\n"
        ]
        
        # Extract price information
        # Note: The exact field names may need adjustment based on actual API response
        current_price = market_data.get('current_price', 'N/A')
        formatted_prices.append(
            f"Current Price: {current_price}\n"
            "---\n"
        )
        
        return "\n".join(formatted_prices)
    except Exception as e:
        return f"Error formatting price data: {str(e)}"


def format_market_history(history_data: dict) -> str:
    """
    Format historical market data into a readable time series format.
    
    Processes historical price and volume data, showing the most recent
    entries for trend analysis.
    
    Args:
        history_data: Dictionary containing historical market data
        
    Returns:
        str: Formatted historical data with timestamps and prices
    """
    try:
        # Validate input
        if not history_data or not isinstance(history_data, dict):
            return "No historical data available"
        
        # Start building formatted output
        formatted_history = [
            f"Historical Data for {history_data.get('title', 'Unknown Market')}\n"
        ]
        
        # Process historical data points
        # Get the last 5 data points (most recent) for display
        # Note: The exact structure may need adjustment based on API response
        for point in history_data.get('history', [])[-5:]:
            formatted_history.append(
                f"Time: {point.get('timestamp', 'N/A')}\n"
                f"Price: {point.get('price', 'N/A')}\n"
                "---\n"
            )
        
        return "\n".join(formatted_history)
    except Exception as e:
        return f"Error formatting historical data: {str(e)}"


@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict | None
) -> list[types.TextContent | types.ImageContent | types.EmbeddedResource]:
    """
    Handle tool execution requests from MCP clients.
    
    This is the main entry point for tool calls. When an AI agent requests
    a tool execution, this function routes the request to the appropriate
    handler based on the tool name.
    
    Args:
        name: Name of the tool to execute (e.g., "get-market-info")
        arguments: Dictionary of arguments passed to the tool
        
    Returns:
        list: List of content items (text, images, or resources) to return to the client
    """
    # Validate that arguments were provided
    if not arguments:
        return [types.TextContent(type="text", text="Missing arguments for the request")]
    
    # Get a configured API client
    client = get_clob_client()
    
    try:
        # Route to the appropriate tool handler
        if name == "get-market-info":
            # Extract required parameter
            market_id = arguments.get("market_id")
            if not market_id:
                return [types.TextContent(type="text", text="Missing market_id parameter")]
            
            # Fetch market data from API
            market_data = client.get_market(market_id)
            
            # Format and return the response
            formatted_info = format_market_info(market_data)
            return [types.TextContent(type="text", text=formatted_info)]

        elif name == "list-markets":
            # Extract optional filter parameter
            status = arguments.get("status")
            
            # Fetch all markets from API
            markets_data = client.get_markets()

            # Handle case where API returns a JSON string instead of parsed object
            if isinstance(markets_data, str):
                try:
                    markets_data = json.loads(markets_data)
                except json.JSONDecodeError:
                    return [types.TextContent(type="text", text="Error: Invalid response format from API")]
            
            # Ensure we have a list (API might wrap it in a dict)
            if not isinstance(markets_data, list):
                if isinstance(markets_data, dict) and 'data' in markets_data:
                    markets_data = markets_data['data']
                else:
                    return [types.TextContent(type="text", text="Error: Unexpected response format from API")]
            
            # Apply status filter if specified
            if status:
                markets_data = [
                    market for market in markets_data 
                    if isinstance(market, dict) and market.get('status', '').lower() == status.lower()
                ]
            
            # Apply pagination (limit and offset)
            offset = arguments.get("offset", 0)
            limit = arguments.get("limit", 10)
            markets_data = markets_data[offset:offset + limit]
            
            # Format and return the response
            formatted_list = format_market_list(markets_data)
            return [types.TextContent(type="text", text=formatted_list)]

        elif name == "get-market-prices":
            # Extract required parameter
            market_id = arguments.get("market_id")
            if not market_id:
                return [types.TextContent(type="text", text="Missing market_id parameter")]
            
            # Fetch market data from API
            market_data = client.get_market(market_id)
            
            # Format and return the response
            formatted_prices = format_market_prices(market_data)
            return [types.TextContent(type="text", text=formatted_prices)]

        elif name == "get-market-history":
            # Extract parameters
            market_id = arguments.get("market_id")
            timeframe = arguments.get("timeframe", "7d")  # Default to 7 days
            
            # Validate required parameter
            if not market_id:
                return [types.TextContent(type="text", text="Missing market_id parameter")]
            
            # Fetch market data from API
            # Note: The timeframe parameter may need to be passed to the API call
            # depending on the CLOB client's capabilities
            market_data = client.get_market(market_id)
            
            # Format and return the response
            formatted_history = format_market_history(market_data)
            return [types.TextContent(type="text", text=formatted_history)]
            
        else:
            # Unknown tool requested
            return [types.TextContent(type="text", text=f"Unknown tool: {name}")]
            
    except Exception as e:
        # Catch any errors and return a user-friendly message
        return [types.TextContent(type="text", text=f"Error executing tool: {str(e)}")]


async def main():
    """
    Main entry point for the MCP server.
    
    This function sets up the stdio communication channel and starts
    the server. It runs until the client disconnects or the process
    is terminated.
    """
    # Use stdio (standard input/output) for communication with MCP clients
    # This is the standard way MCP servers communicate with clients like Claude Desktop
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="polymarket_predictions",
                server_version="0.1.0",
                capabilities=server.get_capabilities(
                    notification_options=NotificationOptions(),
                    experimental_capabilities={},
                ),
            ),
        )


if __name__ == "__main__":
    # Run the server when this script is executed directly
    asyncio.run(main())
