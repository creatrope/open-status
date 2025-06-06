import { set } from '@netlify/blobs';

export async function handler() {
  const url = process.env.URL || 'https://your-site-name.netlify.app';

  try {
    // Fetch the current status from the other function
    const response = await fetch(`${url}/.netlify/functions/get-status`);
    const current = await response.json();

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
      body: JSON.stringify({ error: 'Blob write failed', message: err.message })
    };
  }
}
