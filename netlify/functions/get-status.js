export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: 'OPEN',
      last_updated: new Date().toISOString()
    })
  };
}
