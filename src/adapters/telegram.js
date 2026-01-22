export async function sendTelegram(env, g) {
  const targets = env.TELEGRAM_TARGETS.split(",");

  const text = `
🎁 <b>New Gift Code!</b>

💎 Code: <code>${g.code}</code>
⏳ Expires: ${g.expiresAt || "No expiration"}
  `.trim();

  const keyboard = {
    inline_keyboard: [
      [
        { text: "📋 Copy Code", callback_data: `COPY:${g.code}` },
        { text: "🎮 Redeem", url: `https://kingshot.net/gift-codes/redeem?code=${g.code}` }
      ]
    ]
  };

  for (const chat_id of targets) {
    await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id,
        text,
        parse_mode: "HTML",
        reply_markup: keyboard
      })
    });
  }
}
