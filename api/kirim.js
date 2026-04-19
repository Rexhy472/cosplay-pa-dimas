export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Gunakan POST' });

  const { pesan, channelKey } = req.body;

  // Mengambil link webhook dari Environment Variable Vercel
  const webhookUrl = process.env[channelKey];

  if (!webhookUrl) {
    return res.status(400).json({ error: `Variabel ${channelKey} belum diset di Vercel!` });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: pesan }),
    });

    if (response.ok) {
      return res.status(200).json({ status: 'Berhasil' });
    } else {
      const errTxt = await response.text();
      return res.status(500).json({ error: `Discord Error: ${errTxt}` });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
