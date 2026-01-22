export async function renderDashboard(env) {
  const list = await env.CODES_KV.list({ limit: 1000 });
  const codes = [];

  for (const key of list.keys) {
    const val = await env.CODES_KV.get(key.name);
    if (val) codes.push(JSON.parse(val));
  }

  const data = codes.sort((a,b)=> new Date(b.postedAt)-new Date(a.postedAt));

  const rows = data.map(c=>`
<tr class="${c.isExpired ? "expired":"active"}">
<td>${c.code}</td>
<td>${c.expiresAt || "No expiration"}</td>
<td>${c.postedAt}</td>
<td>
<button onclick="copy('${c.code}')">📋</button>
<a href="https://kingshot.net/gift-codes/redeem?code=${c.code}" target="_blank">🎮</a>
</td>
</tr>
`).join("");

  return new Response(`
<!DOCTYPE html>
<html>
<head>
<title>KingShot Bot</title>
<link rel="stylesheet" href="/style.css">
</head>
<body>
<h1>🎁 KingShot Coupon Bot</h1>
<div>
<button onclick="filter('all')">All</button>
<button onclick="filter('active')">Active</button>
<button onclick="filter('expired')">Expired</button>
<button onclick="location.reload()">🔄 Refresh</button>
</div>
<table>
<tr><th>Code</th><th>Expires</th><th>Posted</th><th>Actions</th></tr>
${rows}
</table>

<script src="/dashboard.js"></script>
</body>
</html>
`, { headers: { "Content-Type": "text/html" }});
}
