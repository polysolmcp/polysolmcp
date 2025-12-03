/**
 * Polymarket Agent Hub - Main Landing Page
 * 
 * This is the main page component for the Polymarket Agent Hub web application.
 * It includes all sections: Hero, What is this?, Quickstart, MCP Config, Tools,
 * Agent Blueprints, FAQ, and Footer.
 * 
 * This is a server component (no "use client" needed) since it's a static
 * marketing page with only anchor links.
 */
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Top Navbar - Sticky header with site title and GitHub link */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Polymarket Agent Hub</h1>
            <a
              href="https://github.com/polysolmcp/polysolmcp"
              target="_blank"
              rel="noreferrer"
              title="View repository on GitHub"
              className="text-sm text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        {/* Hero Section */}
        <section className="mb-24 md:mb-32">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-sky-500/20 via-slate-950 to-slate-950 p-8 md:p-12 lg:p-16">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Left Side */}
              <div className="flex flex-col justify-center space-y-7">
                <div className="inline-block w-fit rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-medium text-sky-300">
                  Polymarket x AI Agents
                </div>
                <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                  Turn Polymarket into an AI-ready prediction feed.
                </h1>
                <p className="text-lg text-slate-400 md:text-xl">
                  This site is the front door for the open-source polymarket-mcp MCP server.
                  It lets AI agents access Polymarket markets, prices, and history through a clean MCP interface.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-slate-700 bg-slate-900/50 px-3 py-1 text-xs font-medium">
                    MCP Server
                  </span>
                  <span className="rounded-full border border-slate-700 bg-slate-900/50 px-3 py-1 text-xs font-medium">
                    MIT Licensed
                  </span>
                  <span className="rounded-full border border-slate-700 bg-slate-900/50 px-3 py-1 text-xs font-medium">
                    Claude-ready
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="https://github.com/polysolmcp/polysolmcp"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-sky-500 px-6 py-3 font-semibold text-white transition-all duration-200 ease-out hover:bg-sky-600 hover:scale-105 hover:shadow-lg hover:shadow-sky-500/50"
                  >
                    View GitHub Repo
                  </a>
                  <a
                    href="#quickstart"
                    className="rounded-lg border border-slate-700 bg-slate-900/50 px-6 py-3 font-semibold transition-all duration-200 ease-out hover:bg-slate-800/50 hover:scale-105 hover:shadow-md hover:border-slate-600"
                  >
                    Agent Quickstart
                  </a>
                </div>
              </div>

              {/* Right Side - Example Agent Card */}
              <div className="flex items-center justify-center">
                <div className="w-full rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6 backdrop-blur-sm">
                  <h3 className="mb-4 text-lg font-semibold">Example agent: Odds Sentinel</h3>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="rounded-lg bg-slate-800/50 p-3">
                      <span className="text-sky-400">→</span>{" "}
                      <span className="text-slate-300">list-markets</span>
                      <span className="text-slate-500">(status="open")</span>
                    </div>
                    <div className="rounded-lg bg-slate-800/50 p-3">
                      <span className="text-sky-400">→</span>{" "}
                      <span className="text-slate-300">get-market-prices</span>
                      <span className="text-slate-500">(market_id="0x123...")</span>
                    </div>
                    <div className="rounded-lg bg-slate-800/50 p-3">
                      <span className="text-sky-400">→</span>{" "}
                      <span className="text-slate-300">get-market-history</span>
                      <span className="text-slate-500">(market_id="0x123...", timeframe="7d")</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is this? Section */}
        <section className="mb-28 md:mb-32">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">What is polymarket-mcp?</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-slate-400">
              <p>
                polymarket-mcp is a Model Context Protocol (MCP) server that wraps Polymarket&apos;s APIs.
                It standardizes several tools for AI agents to interact with prediction markets in a consistent way.
              </p>
              <p>
                The server provides standardized tools for:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Listing markets with filtering and pagination</li>
                <li>Getting detailed market information</li>
                <li>Fetching current prices and implied probabilities</li>
                <li>Retrieving historical price and volume data</li>
              </ul>
              <p>
                It&apos;s designed to run locally or on your own infrastructure, and integrates seamlessly
                with MCP-compatible AI clients like Claude Desktop.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6">
              <h3 className="mb-4 text-xl font-semibold">Highlights</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-sky-400">✓</span>
                  <span>Clean JSON responses optimized for LLMs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-sky-400">✓</span>
                  <span>Access to real prediction markets: politics, crypto, sports, and more</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-sky-400">✓</span>
                  <span>Historical data ready for charting and backtests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-sky-400">✓</span>
                  <span>Error handling and rate limits baked into the server</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quickstart Section */}
        <section id="quickstart" className="mb-24 md:mb-32 scroll-mt-20">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">Quickstart: from zero to running MCP server</h2>
          <p className="mb-8 text-slate-400">
            Clone, configure, and run the polymarket-mcp server in three simple steps.
          </p>
          <div className="grid gap-7 md:grid-cols-3">
            {/* Step 1 */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6">
              <h3 className="mb-3 text-xl font-semibold">1. Clone & install</h3>
              <p className="mb-4 text-sm text-slate-400">
                Get the repository and install dependencies using uv.
              </p>
              <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs">
                <code className="text-slate-300">
                  {`git clone https://github.com/polysolmcp/polysolmcp.git
cd polysolmcp
uv pip install -e .`}
                </code>
              </pre>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6">
              <h3 className="mb-3 text-xl font-semibold">2. Set your environment variables</h3>
              <p className="mb-4 text-sm text-slate-400">
                Configure your Polymarket API key and wallet address.
              </p>
              <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs">
                <code className="text-slate-300">
                  {`KEY=your_polymarket_api_key_here
FUNDER=your_polymarket_wallet_address`}
                </code>
              </pre>
              <p className="mt-3 text-xs text-slate-500">
                Check the GitHub README for the latest required variables and how to obtain your API key.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6">
              <h3 className="mb-3 text-xl font-semibold">3. Run the server</h3>
              <p className="mb-4 text-sm text-slate-400">
                Start the MCP server and optionally use the inspector for debugging.
              </p>
              <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs">
                <code className="text-slate-300">
                  {`uv run src/polymarket_mcp/server.py`}
                </code>
              </pre>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs">
                <code className="text-slate-300">
                  {`npx @modelcontextprotocol/inspector \\
  uv --directory /path/to/polysolmcp \\
  run src/polymarket_mcp/server.py`}
                </code>
              </pre>
              <p className="mt-3 text-xs text-slate-500">
                The inspector is optional, but great for debugging MCP tools.
              </p>
            </div>
          </div>
        </section>

        {/* MCP Client Config Section */}
        <section className="mb-24 md:mb-32">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Connect to Claude Desktop (example config)</h2>
          <p className="mb-6 text-slate-400">
            Claude Desktop can be configured to talk to MCP servers via its claude_desktop_config.json.
            Add polymarket-mcp under the mcpServers section.
          </p>
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6">
            <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm">
              <code className="text-slate-300">
                {`{
  "mcpServers": {
    "polymarket-mcp": {
      "command": "uv",
      "args": [
        "--directory",
        "/Users/your-username/path/to/polysolmcp",
        "run",
        "src/polymarket_mcp/server.py"
      ],
      "env": {
        "KEY": "your_polymarket_api_key",
        "FUNDER": "your_polymarket_wallet_address"
      }
    }
  }
}`}
              </code>
            </pre>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-700/60 bg-slate-900/50 p-4">
              <p className="mb-1 text-sm font-semibold">macOS path:</p>
              <code className="text-xs text-slate-400">
                ~/Library/Application Support/Claude/claude_desktop_config.json
              </code>
            </div>
            <div className="rounded-lg border border-slate-700/60 bg-slate-900/50 p-4">
              <p className="mb-1 text-sm font-semibold">Windows path:</p>
              <code className="text-xs text-slate-400">
                %APPDATA%/Claude/claude_desktop_config.json
              </code>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Paths can vary, and you should consult Claude Desktop documentation if needed.
          </p>
        </section>

        {/* Available Tools Section */}
        <section className="mb-24 md:mb-32">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">Tools your agents can call</h2>
          <p className="mb-8 text-slate-400">
            The polymarket-mcp server exposes four main tools to your AI agents.
          </p>
          <div className="grid gap-7 md:grid-cols-2">
            {/* Tool 1 */}
            <div className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-6">
              <h3 className="mb-2 text-xl font-semibold text-sky-400">list-markets</h3>
              <p className="mb-4 text-slate-400">
                Browse markets with filters for status and pagination.
              </p>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold text-slate-300">Inputs:</span>
                  <span className="ml-2 text-slate-400">
                    status (&quot;open&quot;, &quot;closed&quot;, &quot;resolved&quot;), limit, offset
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-slate-300">Returns:</span>
                  <span className="ml-2 text-slate-400">
                    List of markets with IDs, titles/questions, status, categories, volume, etc.
                  </span>
                </div>
              </div>
            </div>

            {/* Tool 2 */}
            <div className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-6">
              <h3 className="mb-2 text-xl font-semibold text-sky-400">get-market-info</h3>
              <p className="mb-4 text-slate-400">
                Fetch detailed info for a specific market.
              </p>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold text-slate-300">Inputs:</span>
                  <span className="ml-2 text-slate-400">market_id or slug</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-300">Returns:</span>
                  <span className="ml-2 text-slate-400">
                    Title/question, category, status, end/resolution date, volume, liquidity, and description.
                  </span>
                </div>
              </div>
            </div>

            {/* Tool 3 */}
            <div className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-6">
              <h3 className="mb-2 text-xl font-semibold text-sky-400">get-market-prices</h3>
              <p className="mb-4 text-slate-400">
                Retrieve current outcome prices and implied probabilities.
              </p>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold text-slate-300">Inputs:</span>
                  <span className="ml-2 text-slate-400">market_id</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-300">Returns:</span>
                  <span className="ml-2 text-slate-400">
                    Each outcome with its price and probability.
                  </span>
                </div>
              </div>
            </div>

            {/* Tool 4 */}
            <div className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-6">
              <h3 className="mb-2 text-xl font-semibold text-sky-400">get-market-history</h3>
              <p className="mb-4 text-slate-400">
                Get historical prices and volumes for a market.
              </p>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold text-slate-300">Inputs:</span>
                  <span className="ml-2 text-slate-400">
                    market_id, timeframe (e.g. 1d, 7d, 30d, all)
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-slate-300">Returns:</span>
                  <span className="ml-2 text-slate-400">
                    Time series suitable for charts/backtests.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Agent Blueprints Section */}
        <section className="mb-24 md:mb-32">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">Agent blueprints you can build</h2>
          <p className="mb-8 text-slate-400">
            A few ready-made concepts to get your creativity going.
          </p>
          <div className="grid gap-7 md:grid-cols-3">
            {/* Blueprint 1 */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6">
              <h3 className="mb-3 text-xl font-semibold">Market Explorer Bot</h3>
              <p className="mb-4 text-sm text-slate-400">
                Scans open markets, surfaces high-liquidity, high-volume markets, grouped by category.
              </p>
              <p className="mb-3 text-xs font-semibold text-slate-500">Tools used:</p>
              <p className="mb-4 text-xs text-slate-400">list-markets, get-market-info</p>
              <div className="rounded-lg bg-slate-950 p-3">
                <p className="mb-2 text-xs font-semibold text-slate-500">Example instruction:</p>
                <p className="text-xs text-slate-300 italic">
                  &quot;Regularly scan open Polymarket markets, rank them by liquidity and 24h volume, and produce a concise summary of the top 10, grouped by category (politics, crypto, sports, etc.). Highlight any markets that have recently opened or significantly changed volume.&quot;
                </p>
              </div>
            </div>

            {/* Blueprint 2 */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6">
              <h3 className="mb-3 text-xl font-semibold">Odds Change Sentinel</h3>
              <p className="mb-4 text-sm text-slate-400">
                Watches specific markets for sharp moves in probabilities and alerts the user.
              </p>
              <p className="mb-3 text-xs font-semibold text-slate-500">Tools used:</p>
              <p className="mb-4 text-xs text-slate-400">get-market-prices, get-market-history</p>
              <div className="rounded-lg bg-slate-950 p-3">
                <p className="mb-2 text-xs font-semibold text-slate-500">Example instruction:</p>
                <p className="text-xs text-slate-300 italic">
                  &quot;Monitor the specified Polymarket market IDs, track their price history over the last 24 hours, and alert me whenever the implied probability moves by more than 5 percentage points within an hour. Provide context from the recent history when you generate an alert.&quot;
                </p>
              </div>
            </div>

            {/* Blueprint 3 */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6">
              <h3 className="mb-3 text-xl font-semibold">Narrative Tracker</h3>
              <p className="mb-4 text-sm text-slate-400">
                Follows a theme (e.g. US election, BTC ETF, etc.) across multiple related markets.
              </p>
              <p className="mb-3 text-xs font-semibold text-slate-500">Tools used:</p>
              <p className="mb-4 text-xs text-slate-400">list-markets, get-market-info, get-market-prices</p>
              <div className="rounded-lg bg-slate-950 p-3">
                <p className="mb-2 text-xs font-semibold text-slate-500">Example instruction:</p>
                <p className="text-xs text-slate-300 italic">
                  &quot;Identify markets related to the US 2024 election, group them by candidate or key event, and periodically summarize how the probabilities have shifted across the narrative. Point out any markets where the odds diverge significantly from the others.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-24 md:mb-32">
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">FAQ</h2>
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6 transition-all duration-200">
              <h3 className="mb-2 text-lg font-semibold">Do I need to trust this website with my API key?</h3>
              <p className="text-slate-400">
                No. The polymarket-mcp server runs on your own machine or infrastructure. This site is just a web interface for connecting and testing; we never see your keys.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6 transition-all duration-200">
              <h3 className="mb-2 text-lg font-semibold">Which AI clients support MCP?</h3>
              <p className="text-slate-400">
                Claude Desktop explicitly supports MCP, along with any other MCP-compatible clients. The protocol is open and standardized.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6 transition-all duration-200">
              <h3 className="mb-2 text-lg font-semibold">Can I deploy the MCP server to my own infrastructure?</h3>
              <p className="text-slate-400">
                Yes, it&apos;s standard Python. You can run it anywhere you can run uv and provide environment variables—your local machine, a VPS, a container, or any other infrastructure you control.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6 transition-all duration-200">
              <h3 className="mb-2 text-lg font-semibold">Does this perform trading on my behalf?</h3>
              <p className="text-slate-400">
                No. The MCP server provides data about markets, prices, and history. Any actual trading, wallet actions, or automation is done by your own agents or scripts and is your responsibility.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/50">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-slate-400">
                Polymarket Agent Hub — built for developers exploring polymarket-mcp.
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Not affiliated with Polymarket. Use at your own risk.
              </p>
            </div>
            <a
              href="https://github.com/polysolmcp/polysolmcp"
              target="_blank"
              rel="noreferrer"
              title="View repository on GitHub"
              className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
            >
              GitHub →
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

