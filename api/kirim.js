export default async function handler(req, res) {
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
