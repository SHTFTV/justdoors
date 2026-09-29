import type { Express } from 'express';

const recipient = 'rambowallceiling@gmail.com';
const fields = ['name', 'email', 'phone', 'company', 'sector', 'projectAddress', 'openingCount', 'timeline', 'notes'];

export function registerQuoteRoutes(app: Express, env = process.env, send = fetch) {
  const enabled = () => Boolean(env.RESEND_API_KEY && env.QUOTE_FROM_EMAIL);
  app.get('/api/quote-config', (_req, res) => {
    res.set('Cache-Control', 'no-store').json({ enabled: enabled() });
  });
  app.post('/api/submit-quote', async (req, res) => {
    res.set('Cache-Control', 'no-store');
    if (!enabled()) return res.status(503).json({ error: 'Online sending is unavailable. Please email your enquiry or call 778-773-2790.' });
    const body = req.body;
    if (!body || typeof body !== 'object' || fields.some(key => body[key] != null && (typeof body[key] !== 'string' || body[key].length > (key === 'notes' ? 5000 : 300)))) {
      return res.status(400).json({ error: 'Check the enquiry fields and try again.' });
    }
    if (!body.name?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email || '') || !/^[0-9a-f-]{36}$/i.test(body.requestId || '')) {
      return res.status(400).json({ error: 'A name, valid email and request reference are required.' });
    }
    const attachments = body.attachments ?? [];
    if (!Array.isArray(attachments) || attachments.length > 1) return res.status(400).json({ error: 'Attach one PDF, JPG, PNG or CSV file, up to 2 MB.' });
    for (const file of attachments) {
      if (!file || typeof file.filename !== 'string' || file.filename.length > 150 || !/^[^/\\\r\n]+\.(pdf|jpe?g|png|csv)$/i.test(file.filename) || typeof file.content !== 'string' || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(file.content) || !file.content.length || file.content.length > 2796204 || Buffer.from(file.content, 'base64').length > 2 * 1024 * 1024) {
        return res.status(400).json({ error: 'Attach one PDF, JPG, PNG or CSV file, up to 2 MB.' });
      }
    }
    try {
      const response = await send('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `justdoors-${body.requestId}` },
        body: JSON.stringify({ from: env.QUOTE_FROM_EMAIL, to: [recipient], reply_to: body.email, subject: 'Just Doors project enquiry', text: fields.map(key => `${key}: ${body[key] || ''}`).join('\n'), attachments: attachments.map(file => ({ filename: file.filename, content: file.content })) }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || typeof result.id !== 'string' || !result.id) throw new Error('Provider did not accept the enquiry');
      return res.json({ success: true, reference: result.id });
    } catch {
      return res.status(502).json({ error: 'Sending could not be confirmed. Your details are still here. Retry unchanged to avoid a duplicate, or email us directly.' });
    }
  });
}
