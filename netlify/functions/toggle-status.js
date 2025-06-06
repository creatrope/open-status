// netlify/functions/toggle-status.js

let currentStatus = {
  status: "CLOSED",
  last_updated: new Date().toISOString()
};

exports.handler = async function (event, context) {
  try {
    // Toggle the status
    currentStatus.status = currentStatus.status === "OPEN" ? "CLOSED" : "OPEN";
    currentStatus.last_updated = new Date().toISOString();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(currentStatus, null, 2)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error: ${error.message}`
    };
  }
};
