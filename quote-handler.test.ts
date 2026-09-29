import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { registerQuoteRoutes } from './quote-handler';

test('quote delivery validates inputs, preserves attachments, and never reports provider failure as success', async () => {
  let calls = 0;
  let fail = false;
  let captured: any;
  const env = { RESEND_API_KEY: 'test-only', QUOTE_FROM_EMAIL: 'Test <test@example.com>' };
  const app = express();
  app.use(express.json({ limit: '3mb' }));
  registerQuoteRoutes(app, env, (async (_url, init) => {
    calls++;
    captured = init;
    return new Response(JSON.stringify(fail ? { message: 'failure' } : { id: 'provider-reference' }), { status: fail ? 500 : 200 });
  }) as typeof fetch);
  const server = app.listen(0, '127.0.0.1');
  await new Promise<void>(resolve => server.on('listening', resolve));
  const address = server.address() as { port: number };
  const url = `http://127.0.0.1:${address.port}`;
  const payload = { name: 'Test', email: 'test@example.com', requestId: '12345678-1234-1234-1234-123456789abc', attachments: [{ filename: 'schedule.csv', content: Buffer.from('Opening,Quantity\nA,1').toString('base64') }] };
  const post = (body: unknown) => fetch(url + '/api/submit-quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  try {
    assert.deepEqual(await (await fetch(url + '/api/quote-config')).json(), { enabled: true });
    assert.equal((await post({ ...payload, email: 'invalid' })).status, 400);
    assert.equal((await post({ ...payload, attachments: [{ filename: 'script.exe', content: 'YQ==' }] })).status, 400);
    assert.equal((await post({ ...payload, notes: 'x'.repeat(5001) })).status, 400);
    assert.equal(calls, 0);
    const accepted = await post({ ...payload, to: 'attacker@example.com' });
    assert.equal(accepted.status, 200);
    assert.deepEqual(await accepted.json(), { success: true, reference: 'provider-reference' });
    const sent = JSON.parse(captured.body);
    assert.deepEqual(sent.to, ['rambowallceiling@gmail.com']);
    assert.deepEqual(sent.attachments, payload.attachments);
    assert.equal(sent.reply_to, payload.email);
    assert.equal(captured.headers['Idempotency-Key'], 'justdoors-' + payload.requestId);
    fail = true;
    const rejected = await post(payload);
    assert.equal(rejected.status, 502);
    assert.equal((await rejected.json()).success, undefined);
    env.RESEND_API_KEY = '';
    assert.deepEqual(await (await fetch(url + '/api/quote-config')).json(), { enabled: false });
    const before = calls;
    assert.equal((await post(payload)).status, 503);
    assert.equal(calls, before);
  } finally { server.close(); }
});
