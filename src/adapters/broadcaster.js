import { sendTelegram } from "./telegram.js";
// import { sendWhatsApp } from "./whatsapp.js";

export async function broadcast(env, codeData) {
  await sendTelegram(env, codeData);

  // Future WhatsApp
  // await sendWhatsApp(env, codeData);
}
