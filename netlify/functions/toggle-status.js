const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  const filePath = path.resolve(__dirname, '../../status.json');
  const statusData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const newStatus = statusData.status === 'OPEN' ? 'CLOSED' : 'OPEN';
  const updated = {
    status: newStatus,
    last_updated: new Date().toISOString()
  };

  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated)
  };
};
