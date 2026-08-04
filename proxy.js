#!/usr/bin/env node

const remoteUrl = process.env.ICUSYNC_REMOTE_MCP_URL || 'https://mcp.icusync.icu/mcp';
const token = (process.env.ICUSYNC_USER_TOKEN || '').trim();

if (!token) {
  console.error('[IcuSync MCP] Missing ICUSYNC_USER_TOKEN');
  process.exit(1);
}

let sessionId = null;
let stdinBuffer = '';

function writeMessage(message) {
  process.stdout.write(`${JSON.stringify(message)}\n`);
}

function writeJsonRpcError(id, code, message) {
  if (id === undefined || id === null) {
    return;
  }

  writeMessage({
    jsonrpc: '2.0',
    id,
    error: {
      code,
      message,
    },
  });
}

function relaySseChunk(chunk) {
  const lines = chunk.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('data:')) {
      continue;
    }

    const data = trimmed.slice(5).trim();
    if (!data || data === '[DONE]') {
      continue;
    }

    try {
      const parsed = JSON.parse(data);
      writeMessage(parsed);
    } catch {
      // Ignore malformed SSE data frames.
    }
  }
}

async function forwardToRemote(message) {
  const headers = {
    'content-type': 'application/json',
    accept: 'application/json, text/event-stream',
    authorization: `Bearer ${token}`,
  };

  if (sessionId) {
    headers['mcp-session-id'] = sessionId;
  }

  let response;
  try {
    response = await fetch(remoteUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(message),
    });
  } catch (error) {
    writeJsonRpcError(message.id, -32000, `Remote connection failed: ${error.message}`);
    return;
  }

  const nextSessionId = response.headers.get('mcp-session-id');
  if (nextSessionId) {
    sessionId = nextSessionId;
  }

  const contentType = (response.headers.get('content-type') || '').toLowerCase();

  if (!response.ok) {
    const text = await response.text();
    writeJsonRpcError(message.id, -32000, `Remote MCP error (${response.status}): ${text}`);
    return;
  }

  if (contentType.includes('text/event-stream')) {
    const text = await response.text();
    relaySseChunk(text);
    return;
  }

  try {
    const json = await response.json();
    writeMessage(json);
  } catch (error) {
    writeJsonRpcError(message.id, -32700, `Invalid JSON from remote MCP: ${error.message}`);
  }
}

process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  stdinBuffer += chunk;

  while (true) {
    const newlineIndex = stdinBuffer.indexOf('\n');
    if (newlineIndex === -1) {
      break;
    }

    const line = stdinBuffer.slice(0, newlineIndex).trim();
    stdinBuffer = stdinBuffer.slice(newlineIndex + 1);

    if (!line) {
      continue;
    }

    let message;
    try {
      message = JSON.parse(line);
    } catch (error) {
      writeJsonRpcError(null, -32700, `Invalid JSON-RPC payload: ${error.message}`);
      continue;
    }

    forwardToRemote(message);
  }
});

process.stdin.on('error', (error) => {
  console.error('[IcuSync MCP] stdin error:', error.message);
});
