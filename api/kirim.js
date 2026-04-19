export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Gunakan POST' });

  const { pesan, targetUrl } = req.body;

  if (!pesan || !targetUrl) {
    return res.status(400).json({ error: 'Pesan atau Channel belum diisi!' });
  }

  try {
    const response = await fetch(targetUrl, {
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
}export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Gunakan POST');

  // Ambil pesan dan URL tujuan dari halaman web
  const { pesan, targetUrl } = req.body;

  try {
    await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: pesan }),
    });
    return res.status(200).json({ status: 'Ok' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
