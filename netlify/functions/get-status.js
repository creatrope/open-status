// netlify/functions/get-status.js
export async function handler() {
  try {
    const kv = await import('@netlify/kv');
    const status = await kv.get('business_status') || 'CLOSED';
    const last_updated = await kv.get('business_status_last_updated') || new Date().toISOString();

    console.log('Fetched from KV:', { status, last_updated });

    return {
      statusCode: 200,
      body: JSON.stringify({ status, last_updated })
    };
  } catch (err) {
    console.error('KV access failed:', err);

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'UNKNOWN',
        last_updated: new Date().toISOString(),
        error: 'KV not available'
      })
    };
  }
}
