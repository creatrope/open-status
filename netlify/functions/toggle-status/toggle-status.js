export default async (request, context) => {
  let newStatus = "OPEN";
  const existing = await context.blob.get("status.json");

  if (existing?.body) {
    const parsed = await existing.json();
    newStatus = parsed.status === "OPEN" ? "CLOSED" : "OPEN";
  }

  const result = {
    status: newStatus,
    last_updated: new Date().toISOString()
  };

  await context.blob.set("status.json", JSON.stringify(result));

  return Response.json(result);
};
