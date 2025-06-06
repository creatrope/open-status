// netlify/functions/get-status.js
export async function handler() {
  const kv = await import('@netlify/kv');
  const status = await kv.get('business_status') || 'CLOSED';
  const last_updated = await kv.get('business_status_last_updated') || new Date().toISOString();

  return {
    statusCode: 200,
    body: JSON.stringify({ status, last_updated })
  };
}
