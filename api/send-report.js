export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, lastName } = request.body ?? {};
  const cleanFirstName = typeof firstName === "string" ? firstName.trim() : "";
  const cleanLastName = typeof lastName === "string" ? lastName.trim() : "";

  if (!cleanFirstName || !cleanLastName || cleanFirstName.length > 80 || cleanLastName.length > 80) {
    return response.status(400).json({ error: "Nama depan dan nama belakang wajib diisi." });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("[telegram] Missing bot configuration");
    return response.status(500).json({ error: "Konfigurasi Telegram belum tersedia." });
  }

  const message = [
    "Data nama baru dari halaman konfirmasi",
    `Nama depan: ${cleanFirstName}`,
    `Nama belakang: ${cleanLastName}`,
  ].join("\n");

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });

    if (!telegramResponse.ok) {
      console.error("[telegram] Telegram API rejected the message", telegramResponse.status);
      return response.status(502).json({ error: "Telegram gagal menerima data." });
    }

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error("[telegram] Request failed", error);
    return response.status(502).json({ error: "Tidak dapat terhubung ke Telegram." });
  }
}
