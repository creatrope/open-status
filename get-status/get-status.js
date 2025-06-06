// netlify/functions/get-status.js
import { get } from '@netlify/blobs';

export async function handler() {
  try {
    const { metadata, body } = await get('business_status.json');

    if (!body) {
      throw new Error('No status blob found.');
    }

    const { status, last_updated } = JSON.parse(await body.text());

    return {
      statusCode: 200,
      body: JSON.stringify({ status, last_updated })
    };
  } catch (err) {
    console.error('Blob read failed:', err);
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'UNKNOWN',
        last_updated: new Date().toISOString(),
        error: 'Blob not available'
      })
    };
  }
}
