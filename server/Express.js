const express = require("express");
const { OPCUAClient } = require("node-opcua");

const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// Endpoint to fetch OPC UA value
app.get("/api/opcua", async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const { endpoint, nodeId } = req.query;

  try {
    const client = OPCUAClient.create({
      endpoint_must_exist: false,
      keepSessionAlive: true,
      connectionStrategy: {
        maxRetry: -1,
        initialDelay: 1000,
        maxDelay: 2000
      }
    });

    await client.connect(endpoint);

    const session = await client.createSession();
    const dataValue = await session.read({
      nodeId,
      attributeId: 13 // AttributeId for Value
    });

    await session.close();
    await client.disconnect();

    res.json({ value: dataValue.value.value });
  } catch (err) {
    console.error("Error fetching OPC UA value:", err);
    res.status(500).json({ error: "Error fetching OPC UA value" });
  }
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
