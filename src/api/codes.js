export async function listCodesAPI(env) {
  const list = await env.CODES_KV.list({ limit: 1000 });
  const codes = [];

  for (const key of list.keys) {
    const val = await env.CODES_KV.get(key.name);
    if (val) codes.push(JSON.parse(val));
  }

  return new Response(JSON.stringify(codes, null, 2), {
    headers: { "Content-Type": "application/json" }
  });
}
