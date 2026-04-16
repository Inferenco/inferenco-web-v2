export default function NovaBotDocs({ hash }: { hash: string }) {
  return (
    <>
      <div id="nova-bot-introduction" className={`docs-section ${hash === "nova-bot-introduction" ? "active" : ""}`}>
        <h1>Nova Bot - Introduction</h1>

        <p>Nova is a sophisticated AI-powered Telegram bot ecosystem with deep blockchain integration on Aptos. Nova provides advanced group management, AI-driven conversations with tool-calling capabilities, automated payment systems, content moderation, and decentralized governance features. It's designed for Telegram users and groups that need intelligent automation, financial operations, and comprehensive administrative controls.</p>

        <h2>What is Nova Bot?</h2>
        <p>Nova Bot combines cutting-edge AI technology with blockchain transparency to deliver:</p>
        <ul>
          <li><strong>AI-Powered Conversations:</strong> Access to advanced language models (GPT-5, GPT-5-mini) with tool-calling capabilities</li>
          <li><strong>Blockchain Integration:</strong> Multi-chain support across Aptos, Solana, and 20+ EVM-compatible blockchains for transparent payments and transactions</li>
          <li><strong>Multi-Token Support:</strong> Work with native tokens and ERC-20 tokens across all supported chains (APT, USDC, USDT, GUI, ETH, and more)</li>
          <li><strong>Market Data Tools:</strong> Real-time cryptocurrency prices, trending pools, DEX data, price predictions, and more</li>
          <li><strong>Automated Reports:</strong> Generate automated crypto intelligence reports powered by <a href="https://pond3r.xyz/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>Pond3r</a> to track market trends, analyze token opportunities, and discover yield farming opportunities</li>
          <li><strong>Image Generation:</strong> AI-powered image creation capabilities</li>
          <li><strong>Conversation Management:</strong> Automatic summarization for long conversations</li>
          <li><strong>DAO Vote Proposals:</strong> Guide community direction through on-chain proposals and voting</li>
          <li><strong>Sentinel Protection:</strong> Guard your group from bad actors with automated moderation</li>
          <li><strong>User Payments:</strong> Send tokens seamlessly between group members in chat</li>
          <li><strong>Real-time Info:</strong> Get live updates such as price feeds right inside the conversation</li>
          <li><strong>Scheduled AI Prompts:</strong> Automatically deliver insights or reminders (e.g., price updates)</li>
          <li><strong>Scheduled Payments:</strong> Automate moderator or community manager remuneration</li>
          <li><strong>Automatic Bot Answers:</strong> Engage members with instant responses and helpful prompts</li>
          <li><strong>Sponsorships:</strong> Let members sponsor access so others can use AI tools</li>
          <li><strong>Multi-Chain Wallet Support:</strong> Manage wallets across Aptos, Solana, and 20+ EVM-compatible blockchains. Send tokens seamlessly across different networks with automatic gas handling</li>
        </ul>

        <h2>Getting Started with Nova Bot</h2>
        <p>To start using Nova Bot:</p>
        <ol>
          <li>Open Telegram and search for <a href="https://t.me/NovaInferencoBot" target="_blank" className="telegram-link"><i className="fab fa-telegram"></i> @NovaInferencoBot</a></li>
          <li>Click "Start" to begin</li>
          <li>Send <code>/loginuser</code> to authenticate</li>
          <li>Get your wallet address with <code>/walletaddress</code></li>
          <li>Fund your account with APT, USDC, USDT, or GUI tokens</li>
          <li>Start using commands like <code>/c</code> for personal AI chat or <code>/g</code> for group AI chat</li>
        </ol>

        <p>Continue to the <a href="#nova-bot-commands" style={{ color: "var(--primary)", textDecoration: "underline" }}>Commands</a> section to learn about all available commands.</p>
      </div>

      <div id="nova-bot-commands" className={`docs-section ${hash === "nova-bot-commands" ? "active" : ""}`}>
        <h1>Nova Bot - Commands</h1>

        <p>Nova Bot provides a comprehensive set of commands for both personal and group use. Here are all available commands:</p>

        <h2>Basic Commands</h2>
        <div className="endpoint-item">
          <h4><code>/start</code></h4>
          <p>Start interacting with the bot. Use this command to begin your Nova Bot experience.</p>
        </div>

        <div className="endpoint-item">
          <h4><code>/help</code></h4>
          <p>Display help text with information about available commands.</p>
        </div>

        <div className="endpoint-item">
          <h4><code>/aptosconnect</code></h4>
          <p>Open the Aptos Connect app for wallet connection.</p>
        </div>

        <div className="endpoint-item">
          <h4><code>/tutorial</code></h4>
          <p>Watch the quick start tutorial video to learn how to use Nova Bot.</p>
        </div>

        <h2>Authentication Commands</h2>
        <div className="endpoint-item">
          <h4><code>/loginuser</code></h4>
          <p>Log in as a user. This command can only be used in direct messages (DM). Required before using most features.</p>
        </div>

        <div className="endpoint-item">
          <h4><code>/logingroup</code></h4>
          <p>Group login (under development).</p>
        </div>

        <h2>AI Chat Commands</h2>
        <div className="endpoint-item">
          <h4><code>/c</code></h4>
          <p>Prompt to chat with AI in a private conversation. Use this command followed by your question or request. The AI can use various tools to help you.</p>
          <p><strong>Example:</strong> <code>/c What's the price of Bitcoin?</code></p>
        </div>

        <div className="endpoint-item">
          <h4><code>/g</code></h4>
          <p>Prompt to chat with AI in a group. Only group admins can use this command. The AI will respond in the group chat.</p>
          <p><strong>Example:</strong> <code>/g Show trending pools on Aptos</code></p>
        </div>

        <div className="endpoint-item">
          <h4><code>/newchat</code></h4>
          <p>Start a new conversation thread. This clears the conversation history and starts fresh.</p>
        </div>

        <h2>Wallet & Balance Commands</h2>
        <div className="endpoint-item">
          <h4><code>/walletaddress</code></h4>
          <p>Get your Nova wallet address. Use this address to fund your account with tokens.</p>
        </div>

        <div className="endpoint-item">
          <h4><code>/balance</code> [symbol]</h4>
          <p>Get your balance of a token. If no symbol is provided, shows your full portfolio snapshot.</p>
          <p><strong>Example:</strong> <code>/balance APT</code> or <code>/balance</code> for full portfolio</p>
        </div>

        <div className="endpoint-item">
          <h4><code>/groupwalletaddress</code></h4>
          <p>Get the group's wallet address. Use this to fund the group's account.</p>
        </div>

        <div className="endpoint-item">
          <h4><code>/groupbalance</code> [symbol]</h4>
          <p>Get the group's balance of a token. If no symbol is provided, shows the group's full portfolio snapshot.</p>
        </div>

        <div className="endpoint-item">
          <h4><code>/supportedchains</code></h4>
          <p>List all supported EVM blockchain mainnets. Use this command to see which chains you can deposit tokens to.</p>
        </div>

        <h2>Settings Commands</h2>
        <div className="endpoint-item">
          <h4><code>/usersettings</code></h4>
          <p>Open user settings menu. This command can only be used in direct messages (DM). Access model selection, payment settings, API keys, document library, and more.</p>
        </div>

        <div className="endpoint-item">
          <h4><code>/groupsettings</code></h4>
          <p>Open group settings menu. Only group administrators can use this command. Configure payment tokens, DAO preferences, moderation, sponsor settings, welcome protection, command settings, filters, and summarization settings.</p>
        </div>

        <h2>Scheduling Commands</h2>
        <div className="endpoint-item">
          <h4><code>/scheduleprompt</code></h4>
          <p>Schedule a recurring or one-shot group prompt. Only admins can use this command. Useful for automated announcements or regular updates.</p>
        </div>

        <div className="endpoint-item">
          <h4><code>/listscheduled</code></h4>
          <p>List active scheduled prompts. Only admins can use this command.</p>
        </div>

        <div className="endpoint-item">
          <h4><code>/schedulepayment</code></h4>
          <p>Schedule a token payment to a user. Only admins can use this command. Useful for automating moderator or community manager payments.</p>
        </div>

        <div className="endpoint-item">
          <h4><code>/listscheduledpayments</code></h4>
          <p>List scheduled token payments. Only admins can use this command.</p>
        </div>

        <h2>Group Management Commands</h2>
        <div className="endpoint-item">
          <h4><code>/report</code></h4>
          <p>Moderate content by replying to a message. Sends a report to the admin if content is found to be inappropriate, muting the user in this case.</p>
        </div>

        <div className="endpoint-item">
          <h4><code>/rules</code></h4>
          <p>Show core and custom rules for this group.</p>
        </div>

        <h2>Information Commands</h2>
        <div className="endpoint-item">
          <h4><code>/prices</code></h4>
          <p>Display model pricing information for AI services.</p>
        </div>

        <div className="endpoint-item">
          <h4><code>/globalannouncement</code></h4>
          <p>Send a global announcement. Only authorized users can use this command.</p>
        </div>
      </div>

      <div id="nova-bot-settings" className={`docs-section ${hash === "nova-bot-settings" ? "active" : ""}`}>
        <h1>Nova Bot - Settings</h1>

        <p>Nova Bot provides comprehensive settings for both individual users and groups. Configure your preferences to customize your Nova experience.</p>

        <h2>User Settings (<code>/usersettings</code>)</h2>
        <p>User settings can only be accessed in direct messages (DM). Send <code>/usersettings</code> to open the settings menu.</p>

        <h3>Available User Settings</h3>

        <div className="endpoint-item">
          <h4>Select Model</h4>
          <p>Choose which AI model to use for your conversations. Available models include:</p>
          <ul>
            <li><strong>GPT-5:</strong> Most advanced model for complex tasks ($0.00410 per 1k tokens)</li>
            <li><strong>GPT-5-mini:</strong> Faster, more cost-effective option ($0.00082 per 1k tokens)</li>
            <li><strong>Sentinel (GPT-5-nano):</strong> Lightweight model for moderation ($0.00016 per 1k tokens)</li>
          </ul>
          <p>You can also configure reasoning mode and other model preferences.</p>
        </div>

        <div className="endpoint-item">
          <h4>Payment Settings</h4>
          <p>Configure your preferred payment token and currency. Choose from: APT, USDC, USDT, or GUI.</p>
        </div>

        <div className="endpoint-item">
          <h4>API Key</h4>
          <p>Generate and manage API keys for integrating Nova's capabilities into your applications. Each API key can have different application prompts, specific tool permissions, custom token limits, and different payment currencies.</p>
        </div>

        <div className="endpoint-item">
          <h4>Document Library</h4>
          <p>Upload and manage documents for your personal knowledge base. Supported file types include: .txt, .md, .pdf, .docx, and various code files.</p>
        </div>

        <div className="endpoint-item">
          <h4>Summarization Settings</h4>
          <p>Configure conversation summarization preferences. When enabled, long conversations are automatically summarized to maintain context while reducing token usage.</p>
        </div>

        <h2>Group Settings (<code>/groupsettings</code>)</h2>
        <p>Group settings can only be accessed by group administrators. Send <code>/groupsettings</code> in a group chat to open the settings menu.</p>

        <h3>Available Group Settings</h3>

        <div className="endpoint-item">
          <h4>Payment Settings</h4>
          <p>Configure the group's preferred payment token and currency. Same options as user settings (APT, USDC, USDT, GUI).</p>
        </div>

        <div className="endpoint-item">
          <h4>DAO Preferences</h4>
          <p>Configure DAO settings including DAO Token, Vote Duration, and Notifications.</p>
        </div>

        <div className="endpoint-item">
          <h4>Moderation</h4>
          <p>Configure content moderation settings including Sentinel Protection for automated protection against bad actors.</p>
        </div>

        <div className="endpoint-item">
          <h4>Sponsor Settings</h4>
          <p>Configure sponsorship features allowing members to sponsor AI access for others.</p>
        </div>

        <div className="endpoint-item">
          <h4>Welcome Settings</h4>
          <p>Configure welcome messages and new member protection periods.</p>
        </div>

        <div className="endpoint-item">
          <h4>Filters</h4>
          <p>Configure message filters for automated responses or actions based on keywords or patterns.</p>
        </div>

        <div className="endpoint-item">
          <h4>Group Document Library</h4>
          <p>Upload and manage documents for the group's knowledge base.</p>
        </div>

        <div className="endpoint-item">
          <h4>Command Settings</h4>
          <p>Configure command behavior and permissions for the group.</p>
        </div>
      </div>

      <div id="nova-bot-prompts" className={`docs-section ${hash === "nova-bot-prompts" ? "active" : ""}`}>
        <h1>Nova Bot - Prompts</h1>

        <p>Nova Bot provides powerful AI capabilities through prompts. You can use <code>/c</code> for personal conversations and <code>/g</code> for group conversations. The AI can automatically call various tools to help answer your questions.</p>

        <h2>Available Tools</h2>
        <p>Nova Bot has access to a wide range of tools that the AI can use automatically based on your prompts. These tools are categorized into built-in tools and MCP (Model Context Protocol) tools.</p>

        <h3>Built-in Tools</h3>
        <p>These tools are always available and work with both <code>/c</code> and <code>/g</code> commands:</p>

        <div className="endpoint-item">
          <h4>Image Generation</h4>
          <p>Create images from text descriptions using AI. The AI will automatically use this tool when you ask for image generation.</p>
          <p><strong>Cost:</strong> $0.16 per image</p>
        </div>

        <div className="endpoint-item">
          <h4>Web Search Preview</h4>
          <p>Search the web for real-time information. The AI uses this tool to find current information not in its training data.</p>
          <p><strong>Cost:</strong> $0.016 per call</p>
        </div>

        <div className="endpoint-item">
          <h4>File Search (RAG)</h4>
          <p>Search your uploaded documents for context-aware answers. The AI automatically searches your document library (user library for <code>/c</code>, group library for <code>/g</code>) when relevant.</p>
          <p><strong>Cost:</strong> $0.004 per call</p>
        </div>

        <h3>MCP Tools (Blockchain & Data)</h3>
        <p>These tools are available through the MCP server and provide blockchain and market data capabilities:</p>
        <p><strong>Cost:</strong> $0.00082 per 1k tokens (output) — same rate as GPT-5-mini. Pricing is based on output tokens with a minimum charge per request.</p>

        <div className="endpoint-item">
          <h4>Get Trending Pools</h4>
          <p>Fetch top trending DEX pools on networks like Aptos, Solana, Ethereum, BSC, Polygon, Avalanche, Fantom, Cronos, Arbitrum, Base, etc.</p>
        </div>

        <div className="endpoint-item">
          <h4>Search Pools</h4>
          <p>Find specific DEX pools by token symbol, contract address, or pool address. Always specify the network to avoid confusion.</p>
        </div>

        <div className="endpoint-item">
          <h4>Get New Pools</h4>
          <p>Discover the latest pool creations on supported networks.</p>
        </div>

        <div className="endpoint-item">
          <h4>Get Token Price</h4>
          <p>Retrieve focused token price data from BitcoinTry exchange. Use when tokens are unavailable on DEX pools or when you need BitcoinTry-specific data.</p>
        </div>

        <div className="endpoint-item">
          <h4>Get Fear & Greed Index</h4>
          <p>Check current crypto market sentiment. Returns an index from 0-100 indicating market fear or greed.</p>
        </div>

        <div className="endpoint-item">
          <h4>Calculator</h4>
          <p>Evaluate mathematical expressions and financial formulas. Supports arithmetic, percentages, and finance functions (NPV, IRR, PV, FV, PMT, NPER).</p>
        </div>

        <div className="endpoint-item">
          <h4>Get Current Time</h4>
          <p>Get precise time for any timezone. Essential for time-sensitive operations like creating DAO proposals.</p>
        </div>

        <div className="endpoint-item">
          <h4>Coindesk History</h4>
          <p>Retrieve historical crypto price data (OHLC) for specified date ranges.</p>
        </div>

        <div className="endpoint-item">
          <h4>Dexscreener API</h4>
          <p>Access comprehensive DEX data via Dexscreener. Get current prices, token profiles, boosts, orders, and pair metadata.</p>
        </div>

        <div className="endpoint-item">
          <h4>Price Predictions</h4>
          <p>Get AI-powered cryptocurrency price forecasts. Supports both short-term forecasts (15 minutes, 1 hour, 4 hours) using hybrid ensemble models and long-term forecasts (1 day to 4 years) using Monte Carlo simulations.</p>
          <p><strong>Forecast Types:</strong></p>
          <ul>
            <li><strong>Short-term:</strong> 15 minutes, 1 hour, 4 hours</li>
            <li><strong>Long-term:</strong> 1 day, 3 days, 1 week, 1 month, 3 months, 6 months, 1 year, 4 years</li>
          </ul>
          <p>Returns expected price, confidence level, and optionally historical OHLC chart data for visualization.</p>
        </div>

        <div className="endpoint-item">
          <h4>Social Insights</h4>
          <p>Get crypto social media intelligence and sentiment analysis. Provides Twitter/X and Telegram social analytics specifically for cryptocurrency discussions. Use this for:</p>
          <ul>
            <li><strong>Trending Tokens:</strong> Get tokens trending on social media with mention counts and sentiment</li>
            <li><strong>Top Mentions:</strong> Find the most significant mentions for any ticker symbol</li>
            <li><strong>Smart Account Stats:</strong> Analyze Twitter account engagement and smart following metrics</li>
            <li><strong>Mentions Search:</strong> Search mentions by keywords or account name</li>
            <li><strong>Event Summary:</strong> Get AI-generated summaries of events from keyword mentions (5 credits)</li>
            <li><strong>Trending Narratives:</strong> Discover trending crypto narratives on Twitter/X (5 credits)</li>
            <li><strong>Token News:</strong> Find news mentions related to specific tokens</li>
            <li><strong>Trending Contracts:</strong> Track contract addresses trending on Twitter/X or Telegram</li>
          </ul>
          <p><strong>Note:</strong> This tool is specifically for social media analytics, not price data or DEX pools. User profiles in responses are returned as clickable profile links (e.g., <code>[username](https://x.com/username)</code>) instead of @username tags to avoid confusion in other apps.</p>
        </div>

        <div className="endpoint-item">
          <h4>Automated Reports</h4>
          <p>Generate automated, intelligent crypto intelligence reports. Create scheduled reports that analyze blockchain data, track market trends, monitor token opportunities, and discover yield farming opportunities. Reports are available in both Markdown (human-readable) and JSON (machine-readable) formats. Supports creating reports, listing executions, getting report content, and managing report lifecycle.</p>
        </div>

        <h3>Bot-Specific Tools</h3>
        <p>These tools are specific to Nova Bot functionality:</p>

        <div className="endpoint-item">
          <h4>Get Balance</h4>
          <p>Get the current account balance for a user or group. Available for both <code>/c</code> and <code>/g</code>.</p>
        </div>

        <div className="endpoint-item">
          <h4>Get Wallet Address</h4>
          <p>Get the wallet address for a user or group. Available for both <code>/c</code> and <code>/g</code>.</p>
        </div>

        <div className="endpoint-item">
          <h4>Fund Account</h4>
          <p>Fund the resource account with tokens from the main wallet. Available for both <code>/c</code> and <code>/g</code>.</p>
        </div>

        <div className="endpoint-item">
          <h4>Withdraw Funds</h4>
          <p>Withdraw funds from the account. Available for both <code>/c</code> and <code>/g</code>.</p>
        </div>

        <div className="endpoint-item">
          <h4>Multi-Chain Wallet</h4>
          <p>Nova supports wallets across multiple blockchains including Aptos, Solana, and 20+ EVM-compatible chains (Ethereum, Arbitrum, Base, Optimism, Polygon, Avalanche, and more). You can send tokens to users on different blockchains.</p>
          <p><strong>Supported Chains:</strong> Use <code>/supportedchains</code> to see all supported EVM blockchain mainnets.</p>
          <p><strong>Important:</strong> To send tokens on EVM chains (Ethereum, Arbitrum, Base, etc.) or Solana, you must have native tokens (e.g., ETH for Ethereum, SOL for Solana) in your wallet to pay for gas fees. Aptos is the exception—you can send tokens on Aptos without needing APT for gas.</p>
        </div>

        <div className="endpoint-item">
          <h4>Pay Users</h4>
          <p>Send tokens to multiple Telegram users by username. Available for both <code>/c</code> and <code>/g</code>.</p>
        </div>

        <div className="endpoint-item">
          <h4>Create Proposal</h4>
          <p>Create a new DAO voting proposal. Only available for <code>/g</code> (group commands). Requires group DAO settings to be configured.</p>
        </div>

        <div className="endpoint-item">
          <h4>Get Recent Messages</h4>
          <p>Retrieve the most recent messages (up to 30) from the Telegram group chat. Only available for <code>/g</code> (group commands).</p>
        </div>

        <h2>Tools Available for /c (User Prompts)</h2>
        <p>When using <code>/c</code> or <code>/prompt</code> in a private chat, the AI can use:</p>
        <ul>
          <li>All built-in tools (Image Generation, Web Search, File Search)</li>
          <li>All MCP tools (Trending Pools, Search Pools, Token Price, Fear & Greed Index, Calculator, Current Time, Coindesk History, Dexscreener API, Price Predictions, Social Insights, Automated Reports)</li>
          <li>User-specific bot tools (Get Balance, Get Wallet Address, Fund Account, Withdraw Funds, Pay Users)</li>
          <li>Your personal document library (uploaded via User Settings {'>'} Document Library)</li>
        </ul>

        <h2>Tools Available for /g (Group Prompts)</h2>
        <p>When using <code>/g</code> in a group chat (admin only), the AI can use:</p>
        <ul>
          <li>All built-in tools (Image Generation, Web Search, File Search)</li>
          <li>All MCP tools (Trending Pools, Search Pools, Token Price, Fear & Greed Index, Calculator, Current Time, Coindesk History, Dexscreener API, Price Predictions, Social Insights, Automated Reports)</li>
          <li>Group-specific bot tools (Get Balance, Get Wallet Address, Fund Account, Withdraw Funds, Pay Users, Create Proposal, Get Recent Messages)</li>
          <li>Group document library (uploaded via Group Settings {'>'} Group Document Library)</li>
        </ul>

        <h2>Example Prompts</h2>
        <p>Here are some example prompts you can use with Nova Bot:</p>

        <h3>Wallet & Balance Examples</h3>
        <div className="code-block"><code>/c What's my wallet address?</code></div>
        <div className="code-block"><code>/c Show my balance</code></div>
        <div className="code-block"><code>/c Check my APT balance</code></div>
        <div className="code-block"><code>/c How much do I have in USDC?</code></div>
        <div className="code-block"><code>/c Show my balance on Ethereum</code></div>
        <div className="code-block"><code>/c What's my wallet address on Arbitrum?</code></div>
        <div className="code-block"><code>/c Check my USDC balance on Base</code></div>

        <h3>Transaction Examples</h3>
        <div className="code-block"><code>/c Send 10 APT to @username</code></div>
        <div className="code-block"><code>/c Send 0.1 ETH to @username on Ethereum</code></div>
        <div className="code-block"><code>/c Send 50 USDC to @user1 on Arbitrum</code></div>
        <div className="code-block"><code>/c Send 100 USDT to @user2 on Base network</code></div>
        <div className="code-block"><code>/c Withdraw 5 USDC</code></div>
        <div className="code-block"><code>/c Fund my account with 100 APT</code></div>
        <p><strong>Note:</strong> When sending tokens on EVM chains (Ethereum, Arbitrum, Base, etc.) or Solana, you need native tokens (ETH, SOL, etc.) in your wallet to pay for gas fees. Aptos is the exception—you can send tokens on Aptos without needing APT for gas.</p>

        <h3>Market Data Examples</h3>
        <div className="code-block"><code>/c What's the current price of Bitcoin?</code></div>
        <div className="code-block"><code>/c Show me trending pools on Aptos</code></div>
        <div className="code-block"><code>/c Find pools for APT/USDC on Aptos</code></div>
        <div className="code-block"><code>/c What's the Fear & Greed Index?</code></div>
        <div className="code-block"><code>/c Get historical price data for Ethereum for the last 7 days</code></div>

        <h3>Price Prediction Examples</h3>
        <div className="code-block"><code>/c Predict Bitcoin price in 1 hour</code></div>
        <div className="code-block"><code>/c What will Ethereum price be in 1 week?</code></div>
        <div className="code-block"><code>/c Forecast APT price for 1 month</code></div>
        <div className="code-block"><code>/c Get a 4-hour price forecast for Solana</code></div>
        <div className="code-block"><code>/c Show me a 1-year price prediction for Bitcoin with chart data</code></div>

        <h3>Social Intelligence Examples</h3>
        <div className="code-block"><code>/c What tokens are trending on Twitter right now?</code></div>
        <div className="code-block"><code>/c Show me the top mentions of Bitcoin on X in the last 24 hours</code></div>
        <div className="code-block"><code>/c Get smart stats for the Twitter account @elonmusk</code></div>
        <div className="code-block"><code>/c Search for mentions of "Aptos" on Twitter</code></div>
        <div className="code-block"><code>/c What are the trending narratives in crypto right now?</code></div>
        <div className="code-block"><code>/c Find trending contract addresses on Telegram</code></div>
        <div className="code-block"><code>/c Get an event summary about "Bitcoin halving" from social media</code></div>

        <h3>Automated Reports Examples</h3>
        <div className="code-block"><code>/c I want to create report of daily yield farming across Aave, Compound, and Convex protocols</code></div>
        <div className="code-block"><code>/c List all my reports</code></div>
        <div className="code-block"><code>/c What's the status of report 77d51445-4146-4ab4-bf5b-5e69bffe462c?</code></div>
        <div className="code-block"><code>/c Get the latest content for report 77d51445-4146-4ab4-bf5b-5e69bffe462c</code></div>
        <div className="code-block"><code>/c Show me all executions for report 77d51445-4146-4ab4-bf5b-5e69bffe462c</code></div>
        <div className="code-block"><code>/c Analyze the evolution of report 77d51445-4146-4ab4-bf5b-5e69bffe462c</code></div>
        <div className="code-block"><code>/c Show me available datasets for creating reports</code></div>
        <div className="code-block"><code>/c Discover public reports about DeFi yield farming</code></div>

        <h3>DAO & Group Examples (for <code>/g</code>)</h3>
        <div className="code-block"><code>/g Create a DAO proposal to vote on adding a new moderator</code></div>
        <div className="code-block"><code>/g What have we discussed recently in this group?</code></div>
        <div className="code-block"><code>/g Send 50 APT to @user1, @user2, and @user3</code></div>
        <div className="code-block"><code>/g Send 0.05 ETH to @moderator1 on Ethereum</code></div>
        <div className="code-block"><code>/g Send 100 USDC to @member1, @member2 on Arbitrum</code></div>
        <p><strong>Note for Group Admins:</strong> When sending tokens to group members on EVM chains or Solana, ensure the group wallet has native tokens (ETH, SOL, etc.) to cover gas fees. Aptos is the exception.</p>

        <h3>Image Generation Examples</h3>
        <div className="code-block"><code>/c Generate an image of a futuristic city with flying cars</code></div>
        <div className="code-block"><code>/c Create a logo for a crypto project called "Nova"</code></div>

        <h3>Document Search Examples</h3>
        <div className="code-block"><code>/c What does my documentation say about API integration?</code></div>
        <div className="code-block"><code>/c Search my documents for information about pricing</code></div>

        <h3>General AI Examples</h3>
        <div className="code-block"><code>/c What can you help me with?</code></div>
        <div className="code-block"><code>/c Explain how this bot works</code></div>
        <div className="code-block"><code>/c Calculate the ROI if I invest $1000 at 8% annual return for 5 years</code></div>

        <p><strong>Tip:</strong> Use <code>/c</code> for personal chat and <code>/g</code> for group chat (admin only)!</p>
      </div>
    </>
  );
}
