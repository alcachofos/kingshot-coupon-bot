export async function sendWhatsApp(env, g) {
  // Meta WhatsApp Cloud API (EU scaffold)
  /*
  await fetch(`https://graph.facebook.com/v19.0/${env.WHATSAPP_PHONE_ID}/messages`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.WHATSAPP_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: env.WHATSAPP_NUMBER,
      type: "text",
      text: {
        body: `🎁 New Gift Code!\n\nCode: ${g.code}`
      }
    })
  });
  */
}
