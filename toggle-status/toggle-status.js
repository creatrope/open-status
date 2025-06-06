// netlify/functions/toggle-status.js
import { set } from '@netlify/blobs';

export async function handler() {
  try {
    // Toggle logic can come from an existing source
    const current = await fetch(`${process.env.URL}/.netlify/functions/get-status`)
      .then(res => res.json())
      .catch(() => ({ status: 'CLOSED' }));

    const newStatus = current.status === 'OPEN' ? 'CLOSED' : 'OPEN';
    const last_updated = new Date().toISOString();

    const blobData = JSON.stringify({ status: newStatus, last_updated });

    await set('business_status.json', blobData, {
      contentType: 'application/json'
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ status: newStatus, last_updated })
    };
  } catch (err) {
    console.error('Blob write failed:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Blob write failed' })
    };
  }
}
