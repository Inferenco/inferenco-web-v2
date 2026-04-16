export default function NovaAPIDocs({ hash }: { hash: string }) {
  return (
    <>
      <div id="nova-api-introduction" className={`docs-section ${hash === "nova-api-introduction" ? "active" : ""}`}>
        <h1>Nova API - Introduction</h1>

        <p>Developers can integrate Nova's AI and blockchain capabilities into their applications through API key generation, enabling seamless access to its powerful features in third-party projects.</p>

        <h2>What is Nova API?</h2>
        <p>Nova API is a RESTful API that provides programmatic access to Nova's AI and blockchain capabilities. The API offers:</p>
        <ul>
          <li><strong>RESTful Endpoints:</strong> Simple HTTP-based API with JSON request/response format. Base URL: <code>https://gateway.inferenco.com</code></li>
          <li><strong>API Key Authentication:</strong> Secure Bearer token authentication for all requests. Generate and manage multiple API keys with different configurations</li>
          <li><strong>AI Model Access:</strong> Programmatic access to advanced language models (GPT-5, GPT-5-mini) with configurable parameters (verbosity, reasoning mode, token limits)</li>
          <li><strong>Automatic Tool Calling:</strong> AI automatically selects and calls appropriate tools based on your prompts, including market data, price predictions, social intelligence, automated reports, image generation, web search, and more</li>
          <li><strong>Knowledge Base Integration (RAG):</strong> Upload documents to your API key's vector store for context-aware responses. The API automatically searches your knowledge base when relevant</li>
          <li><strong>Streaming Responses:</strong> Support for Server-Sent Events (SSE) for real-time streaming of AI responses</li>
          <li><strong>Custom Configuration:</strong> Configure custom prompts, tool permissions, token limits, and payment currencies per API key</li>
          <li><strong>Conversation Management:</strong> Maintain conversation context with reference IDs and automatic summarization for long conversations</li>
          <li><strong>Pay-Per-Use Billing:</strong> Transparent, on-chain billing in APT, USDC, USDT, or GUI tokens. Pay only for what you use</li>
          <li><strong>Multi-Environment Support:</strong> Create separate API keys for development and production with different settings</li>
        </ul>

        <h2>Use Cases for Integration</h2>

        <div className="use-case-card">
          <h4>AI-Powered Applications</h4>
          <p>Integrate Nova's AI capabilities into web applications, mobile apps, or backend services via REST API calls. Use the <code>/ai</code> endpoint for customer support chatbots, content generation, data analysis, or any application that needs intelligent conversational AI with automatic tool calling.</p>
        </div>

        <div className="use-case-card">
          <h4>Trading & DeFi Platforms</h4>
          <p>Access real-time cryptocurrency market data through AI prompts that automatically call tools like trending pools, DEX pool search, token prices, price predictions, Fear & Greed Index, social intelligence, automated reports, and historical price data.</p>
        </div>

        <div className="use-case-card">
          <h4>Automated Crypto Intelligence Reports</h4>
          <p>Integrate automated crypto intelligence reports into your applications using Nova's reports tool powered by <a href="https://pond3r.xyz/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>Pond3r</a>. Create scheduled reports that analyze blockchain data, track market trends, monitor token opportunities, and discover yield farming opportunities.</p>
        </div>

        <div className="use-case-card">
          <h4>Price Prediction Services</h4>
          <p>Integrate AI-powered price forecasting into your applications. Short-term forecasts (15 minutes to 4 hours) or long-term forecasts (1 day to 4 years) for any cryptocurrency.</p>
        </div>

        <div className="use-case-card">
          <h4>Social Intelligence & Sentiment Analysis</h4>
          <p>Track trending tokens on Twitter/X and Telegram, analyze top mentions, get smart account statistics, search mentions by keywords, discover trending narratives, and monitor contract addresses trending on social media.</p>
        </div>

        <div className="use-case-card">
          <h4>Content Creation Platforms</h4>
          <p>Use Nova's image generation capabilities via API calls.</p>
        </div>

        <div className="use-case-card">
          <h4>Knowledge-Based Applications</h4>
          <p>Build applications with custom knowledge bases using Nova's RAG capabilities. Upload documents to your API key's vector store.</p>
        </div>

        <div className="use-case-card">
          <h4>Automation & Workflow Tools</h4>
          <p>Create automated workflows that combine AI analysis with real-time data.</p>
        </div>

        <h2>Getting Started</h2>
        <p>To start integrating Nova into your application:</p>
        <ol>
          <li>Create an account in the Nova Telegram bot</li>
          <li>Fund your account with supported tokens</li>
          <li>Generate an API key through the bot interface</li>
          <li>Use the API key to authenticate your requests</li>
          <li>Start making API calls to access Nova's features</li>
        </ol>
      </div>

      <div id="generate-api-key" className={`docs-section ${hash === "generate-api-key" ? "active" : ""}`}>
        <h1>Generate API Key</h1>

        <p>To use Nova's API in your applications, you need to generate an API key through the Nova Telegram bot. Follow these steps:</p>

        <h2>Prerequisites</h2>
        <ul>
          <li>A Telegram account</li>
          <li>Access to the Nova Telegram bot: <a href="https://t.me/NovaInferencoBot" target="_blank" className="telegram-link"><i className="fab fa-telegram"></i> @NovaInferencoBot</a></li>
        </ul>

        <h2>Step-by-Step Guide</h2>

        <ol className="step-list">
          <li>
            <strong>Start the Nova Bot</strong>
            <p>Open Telegram and search for <a href="https://t.me/NovaInferencoBot" target="_blank" className="telegram-link"><i className="fab fa-telegram"></i> @NovaInferencoBot</a>, then click "Start" to begin.</p>
          </li>

          <li>
            <strong>Login to Your Account</strong>
            <p>Send the command <code>/loginuser</code> in the bot chat. This will initiate the authentication process.</p>
          </li>

          <li>
            <strong>Get Your Wallet Address</strong>
            <p>Send the command <code>/walletaddress</code> to retrieve your Nova wallet address. You'll need this to fund your account.</p>
          </li>

          <li>
            <strong>Fund Your Account</strong>
            <p>Send funds to your Nova wallet address using one of the supported tokens on Aptos: APT, USDC, USDT, or GUI.</p>
          </li>

          <li>
            <strong>Access API Key Settings</strong>
            <p>Send the command <code>/usersettings</code> to open the user settings menu.</p>
          </li>

          <li>
            <strong>Select API Key Option</strong>
            <p>In the settings menu, click on <strong>"API Key"</strong> to start the API key creation process.</p>
          </li>

          <li>
            <strong>Follow the Creation Wizard</strong>
            <p>The bot will guide you through a 6-step process:</p>
            <ol>
              <li><strong>App Type:</strong> Choose between Frontend (Web App) or Backend (Server)</li>
              <li><strong>Domain (Frontend only):</strong> Enter your application's domain</li>
              <li><strong>Prompt:</strong> Define your application's general prompt and rules</li>
              <li><strong>Tools:</strong> Select which tools your API key will have access to</li>
              <li><strong>Token Limit:</strong> Set the token limit for conversation summarization (default: 20,000)</li>
              <li><strong>Currency:</strong> Choose the payment currency (APT, USDC, USDT, or GUI)</li>
            </ol>
          </li>

          <li>
            <strong>Save Your API Key</strong>
            <p>Once the wizard completes, you'll receive your API key. <strong>Important:</strong> Save this key securely as it won't be shown again.</p>
          </li>
        </ol>

        <h2>Managing API Keys</h2>
        <p>You can create multiple API keys for different applications or environments. Each API key can have different application prompts, tool permissions, token limits, and payment currencies.</p>

        <h2>Security Best Practices</h2>
        <ul>
          <li><strong>Never share your API key</strong> publicly or commit it to version control</li>
          <li><strong>Store keys securely</strong> using environment variables or secure vaults</li>
          <li><strong>Use different keys</strong> for development and production environments</li>
          <li><strong>Revoke keys immediately</strong> if they're compromised or no longer needed</li>
          <li><strong>Monitor usage</strong> to detect any unauthorized access</li>
        </ul>
      </div>

      <div id="tools" className={`docs-section ${hash === "tools" ? "active" : ""}`}>
        <h1>Tools</h1>
        <p>Nova provides a suite of powerful tools that the AI can autonomously call to answer queries.</p>

        <h2>Built-in Tools</h2>
        <ul>
          <li><strong>Image Generation:</strong> Create images from text descriptions ($0.16 per image)</li>
          <li><strong>Web Search Preview:</strong> Search the web for real-time information ($0.016 per call)</li>
          <li><strong>File Search (RAG):</strong> Search your <a href="#add-knowledge" style={{ color: "var(--primary)", textDecoration: "underline" }}>uploaded documents</a> for context-aware answers ($0.004 per call)</li>
        </ul>

        <h2>MCP Tools (Blockchain & Data)</h2>
        <ul>
          <li><strong>Get Trending Pools:</strong> Fetch top trending DEX pools on networks like Aptos, Solana, Ethereum, BSC, etc.</li>
          <li><strong>Search Pools:</strong> Find specific DEX pools by token symbol, contract, or pool address.</li>
          <li><strong>Get New Pools:</strong> Discover the latest pool creations on supported networks.</li>
          <li><strong>Get Token Price:</strong> Retrieve focused token price data from BitcoinTry exchange.</li>
          <li><strong>Get Fear & Greed Index:</strong> Check current crypto market sentiment.</li>
          <li><strong>Calculator:</strong> Evaluate mathematical expressions and financial formulas.</li>
          <li><strong>Get Current Time:</strong> Get precise time for any timezone (essential for time-sensitive operations).</li>
          <li><strong>Coindesk History:</strong> Retrieve historical crypto price data.</li>
          <li><strong>Dexscreener API:</strong> Access comprehensive DEX data via Dexscreener.</li>
          <li><strong>Price Predictions:</strong> Get AI-powered cryptocurrency price forecasts. Supports both short-term forecasts (15 minutes, 1 hour, 4 hours) using hybrid ensemble models and long-term forecasts (1 day to 4 years) using Monte Carlo simulations. Returns expected price, confidence level, and optionally historical OHLC chart data for visualization.</li>
          <li><strong>Social Insights:</strong> Get crypto social media intelligence and sentiment analysis. Provides Twitter/X and Telegram social analytics including trending tokens, top mentions, smart account stats, mentions search, event summaries, trending narratives, token news, and trending contract addresses. User profiles are returned as clickable profile links (e.g., <code>[username](https://x.com/username)</code>) instead of @username tags.</li>
          <li><strong>Automated Reports:</strong> Generate automated, intelligent crypto intelligence reports. Create scheduled reports that analyze blockchain data, track market trends, monitor token opportunities, and discover yield farming opportunities. Reports are available in both Markdown (human-readable) and JSON (machine-readable) formats. Supports creating reports, listing executions, getting report content, and managing report lifecycle.</li>
        </ul>
        <p><strong>MCP Tools Pricing:</strong> $0.00082 per 1k tokens (output) — same rate as GPT-5-mini. Pricing is based on output tokens with a minimum charge per request.</p>

        <h2>Example Prompts Using Tools</h2>
        <p>Here are example prompts you can use with the Nova API to trigger different tools:</p>

        <h3>Price Prediction Examples</h3>
        <div className="code-block">
          <code>{`{
  "input": "Predict Bitcoin price in 1 hour",
  "model": "gpt-5",
  "verbosity": "Medium",
  "max_tokens": 2000,
  "reasoning": false
}`}</code>
        </div>

        <div className="code-block">
          <code>{`{
  "input": "What will Ethereum price be in 1 week? Show me a forecast with chart data",
  "model": "gpt-5",
  "verbosity": "High",
  "max_tokens": 2000,
  "reasoning": false
}`}</code>
        </div>

        <div className="code-block">
          <code>{`{
  "input": "Get a 4-hour price forecast for Solana",
  "model": "gpt-5-mini",
  "verbosity": "Medium",
  "max_tokens": 1500,
  "reasoning": false
}`}</code>
        </div>

        <div className="code-block">
          <code>{`{
  "input": "Forecast APT price for 1 month with confidence intervals",
  "model": "gpt-5",
  "verbosity": "High",
  "max_tokens": 2000,
  "reasoning": false
}`}</code>
        </div>

        <h3>Market Data Examples</h3>
        <div className="code-block">
          <code>{`{
  "input": "Show me trending pools on Aptos",
  "model": "gpt-5-mini",
  "verbosity": "Medium",
  "max_tokens": 1500,
  "reasoning": false
}`}</code>
        </div>

        <div className="code-block">
          <code>{`{
  "input": "Find pools for APT/USDC on Aptos network",
  "model": "gpt-5-mini",
  "verbosity": "Low",
  "max_tokens": 1000,
  "reasoning": false
}`}</code>
        </div>

        <div className="code-block">
          <code>{`{
  "input": "What's the current Fear & Greed Index?",
  "model": "gpt-5-mini",
  "verbosity": "Low",
  "max_tokens": 500,
  "reasoning": false
}`}</code>
        </div>

        <div className="code-block">
          <code>{`{
  "input": "Get historical price data for Ethereum for the last 7 days",
  "model": "gpt-5-mini",
  "verbosity": "Medium",
  "max_tokens": 1500,
  "reasoning": false
}`}</code>
        </div>

        <h3>Image Generation Examples</h3>
        <div className="code-block">
          <code>{`{
  "input": "Generate an image of a futuristic city with flying cars",
  "model": "gpt-5",
  "verbosity": "Medium",
  "max_tokens": 1000,
  "reasoning": false
}`}</code>
        </div>

        <h3>Document Search Examples</h3>
        <div className="code-block">
          <code>{`{
  "input": "What does my documentation say about API integration?",
  "model": "gpt-5",
  "verbosity": "High",
  "max_tokens": 2000,
  "reasoning": false
}`}</code>
        </div>

        <h3>Web Search Examples</h3>
        <div className="code-block">
          <code>{`{
  "input": "Search for the latest news about Aptos blockchain",
  "model": "gpt-5",
  "verbosity": "Medium",
  "max_tokens": 2000,
  "reasoning": false
}`}</code>
        </div>

        <h3>Calculator Examples</h3>
        <div className="code-block">
          <code>{`{
  "input": "Calculate the ROI if I invest $1000 at 8% annual return for 5 years",
  "model": "gpt-5-mini",
  "verbosity": "Low",
  "max_tokens": 500,
  "reasoning": false
}`}</code>
        </div>

        <h3>Social Intelligence Examples</h3>
        <div className="code-block">
          <code>{`{
  "input": "What tokens are trending on Twitter right now?",
  "model": "gpt-5-mini",
  "verbosity": "Medium",
  "max_tokens": 1500,
  "reasoning": false
}`}</code>
        </div>

        <div className="code-block">
          <code>{`{
  "input": "Show me the top mentions of Bitcoin on X in the last 24 hours",
  "model": "gpt-5-mini",
  "verbosity": "Medium",
  "max_tokens": 1500,
  "reasoning": false
}`}</code>
        </div>

        <div className="code-block">
          <code>{`{
  "input": "Get smart stats for the Twitter account @elonmusk",
  "model": "gpt-5-mini",
  "verbosity": "Low",
  "max_tokens": 1000,
  "reasoning": false
}`}</code>
        </div>

        <div className="code-block">
          <code>{`{
  "input": "What are the trending narratives in crypto right now?",
  "model": "gpt-5",
  "verbosity": "High",
  "max_tokens": 2000,
  "reasoning": false
}`}</code>
        </div>

        <div className="code-block">
          <code>{`{
  "input": "Search for mentions of Aptos on Twitter and summarize the sentiment",
  "model": "gpt-5",
  "verbosity": "Medium",
  "max_tokens": 2000,
  "reasoning": false
}`}</code>
        </div>

        <h3>Automated Reports Examples</h3>
        <div className="code-block">
          <code>{`{
  "input": "I want to create report of daily yield farming across Aave, Compound, and Convex protocols",
  "model": "gpt-5",
  "verbosity": "Medium",
  "max_tokens": 2000,
  "reasoning": false
}`}</code>
        </div>

        <div className="code-block">
          <code>{`{
  "input": "List all my reports",
  "model": "gpt-5-mini",
  "verbosity": "Low",
  "max_tokens": 1000,
  "reasoning": false
}`}</code>
        </div>

        <div className="code-block">
          <code>{`{
  "input": "Get the latest content for report 77d51445-4146-4ab4-bf5b-5e69bffe462c",
  "model": "gpt-5-mini",
  "verbosity": "Medium",
  "max_tokens": 2000,
  "reasoning": false
}`}</code>
        </div>

        <div className="code-block">
          <code>{`{
  "input": "Show me available datasets for creating reports",
  "model": "gpt-5-mini",
  "verbosity": "Low",
  "max_tokens": 1000,
  "reasoning": false
}`}</code>
        </div>

        <p><strong>Note:</strong> The AI will automatically select and use the appropriate tools based on your input. You don't need to specify which tools to use - just describe what you want, and the AI will handle the rest!</p>
        <p><strong>Reports Tool:</strong> You can create reports, list executions, get report content, and manage reports through natural language prompts. Reports can be scheduled to run daily, weekly, monthly, or on-demand, and are available in both Markdown and JSON formats.</p>
      </div>

      <div id="add-knowledge" className={`docs-section ${hash === "add-knowledge" ? "active" : ""}`}>
        <h1>Add Knowledge to Your API Key</h1>

        <p>Nova supports Retrieval-Augmented Generation (RAG) by allowing you to upload documents to your API key's vector store. These documents are automatically indexed and used to provide context-aware responses.</p>

        <h2>What is Knowledge Base?</h2>
        <p>Each API key has its own document library (vector store) where you can upload files that contain information relevant to your application.</p>

        <h2>Uploading Files via Telegram Bot</h2>
        <ol className="step-list">
          <li>
            <strong>Access API Key Settings</strong>
            <p>Open the Nova bot and send <code>/usersettings</code> to access your settings menu.</p>
          </li>

          <li>
            <strong>Open API Key Management</strong>
            <p>Click on <strong>"API Key"</strong> in the settings menu to view your API keys.</p>
          </li>

          <li>
            <strong>Select Document Library</strong>
            <p>For each API key, you'll see a <strong>"Document Library"</strong> button. Click it to open the document library.</p>
          </li>

          <li>
            <strong>Upload Files</strong>
            <p>Click <strong>"Upload Files"</strong>, then attach one or more documents. Supported file types: .txt, .md, .pdf, .docx, .py, .js, .ts, .rs, and more.</p>
          </li>
        </ol>

        <h2>Uploading Files via API</h2>
        <p>Manage your knowledge base programmatically using the Nova Gateway API endpoints:</p>
        <div className="code-block"><code>https://gateway.inferenco.com</code></div>

        <div className="endpoint-item">
          <h4><code>POST /vector-store/files</code></h4>
          <p>Upload files to your API key's vector store</p>
        </div>

        <div className="endpoint-item">
          <h4><code>GET /vector-store/files</code></h4>
          <p>List all files in your API key's vector store</p>
        </div>

        <div className="endpoint-item">
          <h4><code>DELETE /vector-store/files</code></h4>
          <p>Delete a specific file from your vector store</p>
        </div>

        <h2>How Knowledge Base Works</h2>
        <p>When you make an AI request, Nova automatically searches your uploaded documents for relevant information and includes it as context in the AI request.</p>
      </div>

      <div id="templates" className={`docs-section ${hash === "templates" ? "active" : ""}`}>
        <h1>API Templates</h1>

        <p>Jump-start your integration with prebuilt examples tailored for Nova Gateway. Templates include environment samples, deployment guides, and best practices so you can ship faster.</p>

        <div className="docs-card">
          <h3>Nova Gateway Telegram Bot</h3>
          <p>A Teloxide-based Rust bot that relays Telegram chats to the Nova Gateway <code>/ai</code> endpoint and streams responses back to the user.</p>
          <ul>
            <li>Clone the repository and copy <code>.env.sample</code> to <code>.env</code>.</li>
            <li>Populate <code>TELEGRAM_BOT_TOKEN</code> and <code>NOVA_API_KEY</code> with your credentials.</li>
            <li>Run <code>cargo run</code>, or use the provided Dockerfile / Cloud Run instructions for deployment.</li>
          </ul>
          <p><a href="https://github.com/Inferenco/nova-gateway-telegram-bot" target="_blank" rel="noopener">View template on GitHub</a></p>
        </div>
      </div>

      <div id="api-docs" className={`docs-section ${hash === "api-docs" ? "active" : ""}`}>
        <h1>API Documentation</h1>

        <p>All API requests should be made to the Nova Gateway endpoint. Include your API key in the <code>Authorization</code> header as a Bearer token.</p>

        <div className="code-block"><code>Authorization: Bearer YOUR_API_KEY</code></div>

        <h2>Base URL</h2>
        <p>The base URL for all API requests is:</p>
        <div className="code-block"><code>https://gateway.inferenco.com</code></div>

        <h2>Authentication</h2>
        <p>Most endpoints require authentication using your API key. Include it in the request header:</p>
        <div className="code-block"><code>Authorization: Bearer nova_your_api_key_here</code></div>

        <h2>AI Endpoints</h2>

        <div className="endpoint-item">
          <div className="endpoint-header">
            <span className="endpoint-badge badge-post">POST</span>
            <span className="endpoint-path">/ai</span>
          </div>
          <p><strong>Send AI request</strong> - Submit a request to Nova's AI with optional tool calling and image inputs.</p>

          <h5>Headers</h5>
          <div className="table-responsive">
            <table className="params-table">
              <thead>
                <tr>
                  <th>Header</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Authorization</td>
                  <td>string</td>
                  <td className="required">Yes</td>
                  <td>Bearer token with your API key</td>
                </tr>
                <tr>
                  <td>Content-Type</td>
                  <td>string</td>
                  <td className="required">Yes</td>
                  <td>application/json</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h5>Request Body</h5>
          <div className="table-responsive">
            <table className="params-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ref_id</td>
                  <td>string</td>
                  <td className="optional">No</td>
                  <td>Optional reference ID for conversation tracking</td>
                </tr>
                <tr>
                  <td>input</td>
                  <td>string</td>
                  <td className="required">Yes</td>
                  <td>The user's message or prompt</td>
                </tr>
                <tr>
                  <td>model</td>
                  <td>string</td>
                  <td className="required">Yes</td>
                  <td>AI model to use (e.g., "gpt-5", "gpt-5-mini")</td>
                </tr>
                <tr>
                  <td>verbosity</td>
                  <td>string</td>
                  <td className="required">Yes</td>
                  <td>Response verbosity level ("Low", "Medium", "High")</td>
                </tr>
                <tr>
                  <td>max_tokens</td>
                  <td>integer</td>
                  <td className="required">Yes</td>
                  <td>Maximum tokens in the response</td>
                </tr>
                <tr>
                  <td>reasoning</td>
                  <td>boolean</td>
                  <td className="required">Yes</td>
                  <td>Enable reasoning mode</td>
                </tr>
                <tr>
                  <td>reasoning_params</td>
                  <td>object</td>
                  <td className="optional">No</td>
                  <td>Reasoning parameters if reasoning is enabled</td>
                </tr>
                <tr>
                  <td>image_urls</td>
                  <td>array[string]</td>
                  <td className="optional">No</td>
                  <td>Array of image URLs to include in the request</td>
                </tr>
                <tr>
                  <td>streaming</td>
                  <td>boolean</td>
                  <td className="optional">No</td>
                  <td>Enable streaming response (Server-Sent Events)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h5>Response</h5>
          <div className="code-block">
            <code>{`{
  "text": "AI response text",
  "model": "gpt-5",
  "image_data": null,
  "tool_calls": [],
  "total_tokens": 150,
  "web_search": 0,
  "file_search": 0,
  "image_generation": 0,
  "code_interpreter": 0
}`}</code>
          </div>

          <h3>Streaming Response (TypeScript Example)</h3>
          <p>When <code>streaming: true</code> is set, the API returns a stream of Server-Sent Events (SSE). Here is an example of how to consume it using TypeScript:</p>
          <div className="code-block">
            <code>{`async function streamAIResponse(apiKey: string, prompt: string) {
  try {
    const response = await fetch('https://gateway.inferenco.com/ai', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-5',
        input: prompt,
        max_tokens: 2000,
        verbosity: 'Medium',
        reasoning: false,
        streaming: true
      })
    });

    if (!response.ok) throw new Error(\`HTTP error! status: \${response.status}\`);
    if (!response.body) throw new Error('Response body is null');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          // Handle text content
          process.stdout.write(data);
        } else if (line.startsWith('event: error')) {
          console.error('Stream error:', line);
        }
      }
    }
  } catch (error) {
    console.error('Streaming failed:', error);
  }
}`}</code>
          </div>
        </div>

        <div className="endpoint-item">
          <div className="endpoint-header">
            <span className="endpoint-badge badge-delete">DELETE</span>
            <span className="endpoint-path">/ai</span>
          </div>
          <p><strong>Clear conversation history</strong> - Remove conversation context for a specific reference ID.</p>

          <h5>Query Parameters</h5>
          <div className="table-responsive">
            <table className="params-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ref_id</td>
                  <td>string</td>
                  <td className="optional">No</td>
                  <td>Reference ID to clear. If omitted, clears default conversation.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="endpoint-item">
          <div className="endpoint-header">
            <span className="endpoint-badge badge-post">POST</span>
            <span className="endpoint-path">/mcp-tools</span>
          </div>
          <p><strong>Call MCP tools directly</strong> - Execute MCP (Model Context Protocol) tools directly without AI. This endpoint allows you to call specific tools by name with custom arguments, bypassing the AI's automatic tool selection.</p>

          <h5>Headers</h5>
          <div className="table-responsive">
            <table className="params-table">
              <thead>
                <tr>
                  <th>Header</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Authorization</td>
                  <td>string</td>
                  <td className="required">Yes</td>
                  <td>Bearer token with your API key</td>
                </tr>
                <tr>
                  <td>Content-Type</td>
                  <td>string</td>
                  <td className="required">Yes</td>
                  <td>application/json</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h5>Request Body</h5>
          <div className="table-responsive">
            <table className="params-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>tools</td>
                  <td>array[object]</td>
                  <td className="required">Yes</td>
                  <td>Array of tool objects to execute. Each tool object must have <code>name</code> (string) and <code>arguments</code> (object) fields.</td>
                </tr>
                <tr>
                  <td>tools[].name</td>
                  <td>string</td>
                  <td className="required">Yes</td>
                  <td>Name of the MCP tool to call (e.g., "get_trending_pools", "get_token_price", "get_forecast", "social_intelligence")</td>
                </tr>
                <tr>
                  <td>tools[].arguments</td>
                  <td>object</td>
                  <td className="required">Yes</td>
                  <td>JSON object containing the arguments for the tool. Structure depends on the specific tool being called.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h5>Example Request</h5>
          <p>Call a single tool:</p>
          <div className="code-block">
            <code>{`curl -X POST https://gateway.inferenco.com/mcp-tools \\
  -H "Authorization: Bearer nova_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "tools": [
      {
        "name": "get_token_price",
        "arguments": {
          "symbol": "BTC",
          "network": "aptos"
        }
      }
    ]
  }'`}</code>
          </div>

          <p>Call multiple tools:</p>
          <div className="code-block">
            <code>{`curl -X POST https://gateway.inferenco.com/mcp-tools \\
  -H "Authorization: Bearer nova_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "tools": [
      {
        "name": "get_trending_pools",
        "arguments": {
          "network": "aptos",
          "limit": 10
        }
      },
      {
        "name": "get_token_price",
        "arguments": {
          "symbol": "APT",
          "network": "aptos"
        }
      }
    ]
  }'`}</code>
          </div>

          <p>Example with forecast tool:</p>
          <div className="code-block">
            <code>{`curl -X POST https://gateway.inferenco.com/mcp-tools \\
  -H "Authorization: Bearer nova_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "tools": [
      {
        "name": "get_forecast",
        "arguments": {
          "asset_id": "bitcoin",
          "forecast_type": "short",
          "duration": "one_hour",
          "vs_currency": "usd",
          "include_chart": false
        }
      }
    ]
  }'`}</code>
          </div>

          <p><strong>Note:</strong> For <code>get_forecast</code>, use <code>asset_id</code> (CoinGecko format like "bitcoin", "ethereum", "stohn-coin") not ticker symbols. <code>forecast_type</code> should be "short" or "long". <code>duration</code> for short-term: "fifteen_minutes", "one_hour", "four_hours". For long-term: "one_day", "three_days", "one_week", "one_month", "three_months", "six_months", "one_year", "four_years".</p>

          <h5>Response</h5>
          <p>Returns an array of tool execution results. Each result contains the tool's response content.</p>
          <div className="code-block">
            <code>{`[
  {
    "content": [
      {
        "type": "text",
        "text": "Tool execution result here..."
      }
    ],
    "isError": false
  }
]`}</code>
          </div>

          <h5>Available MCP Tools</h5>
          <p>The following MCP tools are available (same tools that can be called automatically via the <code>/ai</code> endpoint):</p>

          <h5>Market Data Tools</h5>
          <ul>
            <li><strong>get_trending_pools</strong> - Get trending DEX pools on various networks</li>
            <li><strong>search_pools</strong> - Search for specific DEX pools</li>
            <li><strong>get_new_pools</strong> - Get newly created pools</li>
            <li><strong>get_token_price</strong> - Get token price from BitcoinTry exchange</li>
            <li><strong>get_fear_and_greed_index</strong> - Get crypto market sentiment index</li>
            <li><strong>get_coindesk_history</strong> - Get historical crypto price data</li>
            <li><strong>dexscreener_api</strong> - Access Dexscreener DEX data</li>
          </ul>

          <h5>AI & Prediction Tools</h5>
          <ul>
            <li><strong>get_forecast</strong> - Get AI-powered price predictions</li>
            <li><strong>social_intelligence</strong> - Get social media insights and sentiment analysis</li>
            <li><strong>manage_reports</strong> - Generate automated crypto intelligence reports. Create, list, and manage scheduled reports that analyze blockchain data</li>
          </ul>

          <h5>Utility Tools</h5>
          <ul>
            <li><strong>calculate_expression</strong> - Evaluate mathematical expressions</li>
            <li><strong>get_current_time</strong> - Get current time for any timezone</li>
          </ul>

          <h4>Tool Examples</h4>

          <h5>get_trending_pools</h5>
          <div className="code-block">
            <code>{`{
  "tools": [{
    "name": "get_trending_pools",
    "arguments": {
      "network": "aptos",
      "limit": 10,
      "page": 1,
      "duration": "24h"
    }
  }]
}`}</code>
          </div>

          <h5>search_pools</h5>
          <div className="code-block">
            <code>{`{
  "tools": [{
    "name": "search_pools",
    "arguments": {
      "network": "aptos",
      "token_symbol": "APT",
      "limit": 5
    }
  }]
}`}</code>
          </div>

          <h5>get_token_price</h5>
          <div className="code-block">
            <code>{`{
  "tools": [{
    "name": "get_token_price",
    "arguments": {
      "symbol": "BTC"
    }
  }]
}`}</code>
          </div>

          <h5>get_forecast</h5>
          <p><strong>Important:</strong> Use CoinGecko asset IDs (e.g., "bitcoin", "ethereum") not ticker symbols. Duration values: short-term: "fifteen_minutes", "one_hour", "four_hours"; long-term: "one_day", "three_days", "one_week", "one_month", "three_months", "six_months", "one_year", "four_years".</p>
          <div className="code-block">
            <code>{`{
  "tools": [{
    "name": "get_forecast",
    "arguments": {
      "asset_id": "bitcoin",
      "forecast_type": "short",
      "duration": "one_hour",
      "vs_currency": "usd",
      "include_chart": false
    }
  }]
}`}</code>
          </div>

          <h5>social_intelligence</h5>
          <div className="code-block">
            <code>{`{
  "tools": [{
    "name": "social_intelligence",
    "arguments": {
      "operation": "trending_tokens",
      "time_period": 24,
      "limit": 10,
      "min_mentions": 5
    }
  }]
}`}</code>
          </div>
          <p>Other operations: "smart_stats" (requires account), "top_mentions" (requires ticker), "mentions_search" (requires keywords), "event_summary", "trending_narratives", "token_news", "trending_contracts_twitter", "trending_contracts_telegram".</p>
          <p><strong>Note:</strong> User profiles in responses are returned as clickable profile links (e.g., <code>[username](https://x.com/username)</code>) instead of @username tags to avoid confusion in other apps.</p>

          <h5>get_fear_and_greed_index</h5>
          <div className="code-block">
            <code>{`{
  "tools": [{
    "name": "get_fear_and_greed_index",
    "arguments": {}
  }]
}`}</code>
          </div>

          <h5>calculate_expression</h5>
          <div className="code-block">
            <code>{`{
  "tools": [{
    "name": "calculate_expression",
    "arguments": {
      "expression": "1000 * (1 + 0.08) ^ 5"
    }
  }]
}`}</code>
          </div>

          <h5>get_current_time</h5>
          <div className="code-block">
            <code>{`{
  "tools": [{
    "name": "get_current_time",
    "arguments": {
      "timezone": "UTC"
    }
  }]
}`}</code>
          </div>

          <h5>get_coindesk_history</h5>
          <div className="code-block">
            <code>{`{
  "tools": [{
    "name": "get_coindesk_history",
    "arguments": {
      "symbol": "BTC",
      "start_date": "2024-01-01",
      "end_date": "2024-01-31"
    }
  }]
}`}</code>
          </div>

          <h5>dexscreener_api</h5>
          <div className="code-block">
            <code>{`{
  "tools": [{
    "name": "dexscreener_api",
    "arguments": {
      "operation": "search",
      "query": "APT/USDC"
    }
  }]
}`}</code>
          </div>

          <h5>manage_reports</h5>
          <p><strong>Note:</strong> Available actions: "create", "list", "list_by_ref", "status", "datasets", "discover", "list_executions", "get_content", "get_latest_content", "get_all_executions_content", "delete".</p>
          <p>Create a report:</p>
          <div className="code-block">
            <code>{`{
  "tools": [{
    "name": "manage_reports",
    "arguments": {
      "action": "create",
      "prompt": "I want to create report of daily yield farming across Aave, Compound, and Convex protocols",
      "dataset_id": "d2b06dec-fdea-44dc-8e1a-09168a24c496",
      "schedule_frequency": "daily",
      "delivery_api_retention": true
    }
  }]
}`}</code>
          </div>
          <p>Get latest report content:</p>
          <div className="code-block">
            <code>{`{
  "tools": [{
    "name": "manage_reports",
    "arguments": {
      "action": "get_latest_content",
      "report_id": "77d51445-4146-4ab4-bf5b-5e69bffe462c",
      "format": "markdown"
    }
  }]
}`}</code>
          </div>
          <p>List all executions with content:</p>
          <div className="code-block">
            <code>{`{
  "tools": [{
    "name": "manage_reports",
    "arguments": {
      "action": "get_all_executions_content",
      "report_id": "77d51445-4146-4ab4-bf5b-5e69bffe462c",
      "format": "markdown",
      "limit": 10
    }
  }]
}`}</code>
          </div>

          <p><strong>Usage:</strong> Use this endpoint when you need to call specific tools directly without AI interpretation. The AI endpoint (<code>/ai</code>) automatically selects and calls appropriate tools based on your prompt, while this endpoint gives you direct control over tool execution.</p>
        </div>

        <h2>Error Responses</h2>
        <p>All endpoints may return standard HTTP error codes:</p>
        <ul>
          <li><strong>400 Bad Request</strong> - Invalid request parameters</li>
          <li><strong>401 Unauthorized</strong> - Missing or invalid API key</li>
          <li><strong>403 Forbidden</strong> - Insufficient permissions</li>
          <li><strong>404 Not Found</strong> - Resource not found</li>
          <li><strong>500 Internal Server Error</strong> - Server error</li>
        </ul>

        <p>Error responses follow this format:</p>
        <div className="code-block">
          <code>{`{
  "message": "Error description",
  "status": 401
}`}</code>
        </div>

        <h2>Rate Limiting</h2>
        <p>API requests are subject to rate limiting based on your account tier and usage patterns. If you exceed the rate limit, you'll receive a <code>429 Too Many Requests</code> response.</p>

        <h2>Support</h2>
        <p>For API support, questions, or issues, contact the Nova team through our <a href="https://t.me/inferenco" target="_blank" className="telegram-link"><i className="fab fa-telegram"></i>Telegram group</a> or visit the Nova documentation.</p>
      </div>
    </>
  );
}
