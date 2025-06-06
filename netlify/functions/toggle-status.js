<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Toggle Business Status</title>
</head>
<body>
  <h1>Toggle Business Status</h1>
  <button onclick="toggle()">Toggle OPEN/CLOSED</button>
  <pre id="result" style="margin-top: 1em; font-family: monospace;"></pre>

  <script>
    async function toggle() {
      const resultElement = document.getElementById("result");
      try {
        const res = await fetch("/.netlify/functions/toggle-status", { method: "POST" });
        if (!res.ok) throw new Error("Network response was not OK");
        const data = await res.json();
        resultElement.innerText = "✅ Status toggled:\n" + JSON.stringify(data, null, 2);
      } catch (err) {
        resultElement.innerText = "❌ Error toggling status:\n" + err.message;
      }
    }
  </script>
</body>
</html>
