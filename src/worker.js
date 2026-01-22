import { broadcast } from "./adapters/broadcaster.js";
import { renderDashboard } from "./dashboard/index.js";
import { listCodesAPI } from "./api/codes.js";

export default {
  async scheduled(event, env, ctx) {
    await handleCron(env);
  },

  async fetch(req, env) {
    const url = new URL(req.url);

    if (url.pathname === "/") return renderDashboard(env);
    if (url.pathname === "/api/codes") return listCodesAPI(env);

    return new Response("OK");
  }
};

async function handleCron(env) {
  const API_URL = "https://kingshot.net/api/gift-codes";

  const res = await fetch(API_URL);
  const json = await res.json();
  const giftCodes = json?.data?.giftCodes || [];

  for (const g of giftCodes) {
    const code = g.code;
    const expires = g.expiresAt ? new Date(g.expiresAt) : null;

    // store expired but don't post
    const isExpired = expires && expires < new Date();

    const exists = await env.CODES_KV.get(code);
    if (exists) continue;

    const payload = {
      ...g,
      isExpired,
      postedAt: new Date().toISOString()
    };

    await env.CODES_KV.put(code, JSON.stringify(payload));

    if (isExpired) continue; // stored but not posted

    await broadcast(env, payload);
  }
}
