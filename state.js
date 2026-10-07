// Garde l'état du match dans Upstash Redis pour relier téléphone et OBS.
export default async function handler(req, res) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const headers = { Authorization: 'Bearer ' + process.env.UPSTASH_REDIS_REST_TOKEN };
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json');
  try {
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      await fetch(url + '/set/fc-affichage', { method: 'POST', headers, body });
      return res.status(200).send('{"ok":true}');
    }
    const r = await fetch(url + '/get/fc-affichage', { headers });
    const j = await r.json();
    return res.status(200).send(j.result || 'null');
  } catch (e) {
    return res.status(500).send('{"ok":false}');
  }
}
