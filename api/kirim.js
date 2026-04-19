export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Gunakan POST' });

  const { pesan, channelId } = req.body;
  const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN; // Ambil Token dari Vercel

  if (!pesan || !channelId) {
    return res.status(400).json({ error: 'Pesan atau Channel belum dipilih!' });
  }

  try {
    const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
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
