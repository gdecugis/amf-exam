export async function onRequestPost(context) {
  const { env, request } = context;
  
  try {
    const payload = await request.json();

    // BYO-key path (personal question generation): the caller supplies their
    // own OpenAI-compatible key/base URL, used only for this request — never
    // logged or persisted. Falls back to the server's own env vars, which is
    // the owner-only path used to seed/extend the canonical DB.
    const apiKey = payload.apiKey || env.LLM_API_KEY;
    const apiBase = payload.apiBase || env.OPENAI_API_BASE;
    const model = payload.model || env.LLM_MODEL || 'deepseek-ai/DeepSeek-V4-Flash-0731';

    if (!apiKey || !apiBase) {
      return new Response(JSON.stringify({ error: 'Missing API key or base URL' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const response = await fetch(`${apiBase}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: payload.messages,
        temperature: payload.temperature || 0.1
      })
    });
    
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
